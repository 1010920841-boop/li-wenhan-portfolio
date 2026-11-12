(() => {
  const svg = document.querySelector('.sphere-orbits');
  if (!svg) return;
  const paths = [0,1].map(i => ({
    front: svg.querySelector(`[data-orbit="${i}-front"]`),
    back: svg.querySelector(`[data-orbit="${i}-back"]`)
  }));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const radius=85, camera=460, segments=128, cycleMs=12000;
  const cz=Math.cos(-.4), sz=Math.sin(-.4);
  let elapsed=0, startedAt=null, frameId=null, visible=false;
  // Precompute the great circles; reuse numeric storage on every frame.
  const circles=[0,1].map(ring => {
    const data=new Float64Array((segments+1)*3);
    for(let i=0;i<segments;i++) {
      const angle=i/segments*Math.PI*2, j=i*3;
      data[j]=radius*Math.cos(angle);
      data[j+(ring===0?1:2)]=radius*Math.sin(angle);
    }
    data.set(data.subarray(0,3),segments*3);
    return data;
  });
  const rotated=new Float64Array((segments+1)*3);
  function render(time) {
    // Both rings share one rigid rotation; X and Y run at the same faster angular speed.
    // Each axis completes one turn per 12-second cycle, with matching seam velocity.
    const phase=(time%cycleMs)/cycleMs*Math.PI*2;
    const cy=Math.cos(1.5+phase), sy=Math.sin(1.5+phase);
    const cx=Math.cos(.9+phase), sx=Math.sin(.9+phase);
    function project(x,y,z) {
      const scale=camera/(camera-z);
      return `${(120+x*scale).toFixed(2)},${(120+y*scale).toFixed(2)}`;
    }
    circles.forEach((circle,ring) => {
      for(let j=0;j<circle.length;j+=3) {
        const x1=cy*circle[j]+sy*circle[j+2],z1=-sy*circle[j]+cy*circle[j+2];
        const y2=cx*circle[j+1]-sx*z1;
        rotated[j]=cz*x1-sz*y2;
        rotated[j+1]=sz*x1+cz*y2;
        rotated[j+2]=sx*circle[j+1]+cx*z1;
      }
      let front='',back='',lastSide=null;
      function line(a,b,isFront) {
        const command=(lastSide===isFront?'':'M'+a)+'L'+b;
        if(isFront) front+=command; else back+=command;
        lastSide=isFront;
      }
      let previousPoint=project(rotated[0],rotated[1],rotated[2]);
      for(let i=0;i<segments;i++) {
        const j=i*3,k=j+3,az=rotated[j+2],bz=rotated[k+2];
        const nextPoint=project(rotated[k],rotated[k+1],bz);
        if((az>=0)===(bz>=0)) line(previousPoint,nextPoint,az>=0);
        else {
          const t=az/(az-bz);
          const cross=project(rotated[j]+(rotated[k]-rotated[j])*t,rotated[j+1]+(rotated[k+1]-rotated[j+1])*t,0);
          line(previousPoint,cross,az>=0);line(cross,nextPoint,bz>=0);
        }
        previousPoint=nextPoint;
      }
      paths[ring].front.setAttribute('d',front);
      paths[ring].back.setAttribute('d',back);
    });
  }
  function frame(now) {
    render(elapsed+(now-startedAt));
    frameId=requestAnimationFrame(frame);
  }
  function sync() {
    const run=visible&&!document.hidden&&!reduced.matches;
    if(run && frameId===null) {
      startedAt=performance.now();
      frameId=requestAnimationFrame(frame);
    } else if(!run && frameId!==null) {
      elapsed=(elapsed+performance.now()-startedAt)%cycleMs;
      cancelAnimationFrame(frameId);frameId=null;startedAt=null;
    }
  }
  new IntersectionObserver(entries => {
    const next=entries[0].isIntersecting;
    if(next!==visible) {visible=next;sync();}
  }).observe(svg);
  reduced.addEventListener('change',sync);
  document.addEventListener('visibilitychange',sync);
  render(0);
})();
