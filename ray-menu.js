(() => {
  const nav = document.querySelector('.quick-nav');
  const links = [...nav.querySelectorAll('.ray-link')];
  const glass = nav.querySelector('.ray-glass');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const lineStart = 52;
  const lineEnd = 52 + (219 - 52) * .7; // Exactly 30% shorter visible rays.
  const labelRadius = 52 + (164 - 52) * .7;
  const fanRadius = 57 + (240 - 57) * .7;
  let widths = links.map(() => 20);
  let selected = -1;
  let animation;
  const point = (radius, angle) => {
    const rad = angle * Math.PI / 180;
    return [260 + radius * Math.cos(rad), 260 + radius * Math.sin(rad)];
  };
  function path(start, end, inner, outer) {
    const a = point(outer, start), b = point(outer, end), c = point(inner, end), d = point(inner, start);
    return `M ${a} A ${outer} ${outer} 0 0 1 ${b} L ${c} A ${inner} ${inner} 0 0 0 ${d} Z`;
  }
  function polygon(start, end) {
    const angles = Array.from({length:25}, (_, i) => start + (end - start) * i / 24);
    const points = [...angles.map(a=>point(fanRadius,a)),...angles.reverse().map(a=>point(55,a))];
    return `polygon(${points.map(p=>`${p[0]/5.2}% ${p[1]/5.2}%`).join(',')})`;
  }
  function draw() {
    let upper = 250;
    links.forEach((link, i) => {
      const lower = upper - widths[i];
      const center = (upper + lower) / 2;
      // Continuous sectors extend beyond the ray ends: no narrow-line targeting needed.
      link.querySelector('.ray-hit').setAttribute('d', path(lower, upper, 43, fanRadius + 22));
      link.querySelector('.ray-fill').setAttribute('d', path(lower + .7, upper - .7, 55, fanRadius));
      const a=point(lineStart,center), b=point(lineEnd,center), t=point(labelRadius,center);
      const line=link.querySelector('.ray-line'), text=link.querySelector('text');
      ['x1','y1','x2','y2'].forEach((key,j)=>line.setAttribute(key,[...a,...b][j]));
      text.setAttribute('x',t[0]);text.setAttribute('y',t[1]);
      text.setAttribute('transform',`rotate(${center-180} ${t[0]} ${t[1]})`);
      if (i === selected) glass.style.clipPath = polygon(lower + .7, upper - .7);
      upper = lower;
    });
  }
  function select(index) {
    if (index === selected) return;
    cancelAnimationFrame(animation);
    selected = index;
    links.forEach((link,i)=>link.classList.toggle('is-selected',i===index));
    nav.classList.toggle('has-ray-selection',index>=0);
    const start = [...widths];
    // Total spread remains 120°: the selected 40° sector pushes five 16° neighbors aside.
    const target = links.map((_,i)=>index < 0 ? 20 : i===index ? 40 : 16);
    if (motion.matches) { widths = target; draw(); return; }
    const began = performance.now();
    function frame(now) {
      const t=Math.min((now-began)/230,1), eased=1-Math.pow(1-t,3);
      widths=start.map((w,i)=>w+(target[i]-w)*eased);
      draw();
      if(t<1) animation=requestAnimationFrame(frame);
    }
    animation=requestAnimationFrame(frame);
  }
  links.forEach((link,index)=>{
    link.addEventListener('pointerenter',()=>select(index));
    link.addEventListener('focus',()=>select(index));
  });
  nav.querySelector('.back-to-top').addEventListener('pointerenter',()=>select(-1));
  nav.querySelector('.back-to-top').addEventListener('focus',()=>select(-1));
  new MutationObserver(() => {
    if (!nav.classList.contains('is-open')) select(-1);
  }).observe(nav,{attributes:true,attributeFilter:['class']});
  draw();
})();
