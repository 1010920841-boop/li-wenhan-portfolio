(() => {
  const track = document.querySelector('#project-track');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hoverCapable = matchMedia('(hover: hover)');
  const originals = [...track.children];
  // Duplicate visuals for a seamless loop; only original cards enter the tab order.
  for (let set = 0; set < 2; set++) {
    originals.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('button, a').forEach(control => control.tabIndex = -1);
      track.append(clone);
    });
  }
  let stopped = reduced.matches;
  let touching = false;
  let visible = false;
  let manualUntil = 0;
  let previous = 0;
  let position = 0;
  function cycleWidth() { return track.children[originals.length].offsetLeft - track.children[0].offsetLeft; }
  track.addEventListener('touchstart', () => { touching = true; }, { passive: true });
  const touchEnd = () => { touching = false; manualUntil = performance.now() + 5000; };
  track.addEventListener('touchend', touchEnd, { passive: true });
  track.addEventListener('touchcancel', touchEnd, { passive: true });
  track.addEventListener('wheel', () => { manualUntil = performance.now() + 5000; }, { passive: true });
  // Leaving the carousel clears the manual-scroll delay immediately.
  track.addEventListener('pointerleave', event => {
    if (event.pointerType === 'touch') return;
    manualUntil = 0;
    position = track.scrollLeft;
    previous = performance.now();
  });
  function step(direction) {
    manualUntil = performance.now() + 5000;
    const width = cycleWidth();
    if (direction < 0 && track.scrollLeft < width / originals.length) track.scrollLeft += width;
    if (direction > 0 && track.scrollLeft >= width * 2) track.scrollLeft -= width;
    track.scrollBy({ left: direction * width / originals.length, behavior: reduced.matches ? 'instant' : 'smooth' });
  }
  document.querySelector('#projects-prev').addEventListener('click', () => step(-1));
  document.querySelector('#projects-next').addEventListener('click', () => step(1));
  track.addEventListener('keydown', event => {
    if (event.target === track && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  reduced.addEventListener('change', () => { stopped = reduced.matches; });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { threshold: 0.1 }).observe(track);
  function frame(now) {
    const dt = previous ? Math.min(now - previous, 50) : 0;
    previous = now;
    const focused = track.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
    const hovered = hoverCapable.matches && track.querySelector('.project-card:hover');
    if (stopped || touching || focused || hovered || !visible || document.hidden || now < manualUntil || document.querySelector('dialog[open]')) {
      position = track.scrollLeft;
    } else {
      const width = cycleWidth();
      position += dt * 0.026;
      if (width && position >= width) position %= width;
      track.scrollLeft = position;
    }
    requestAnimationFrame(frame);
  }
  new ResizeObserver(() => { position = track.scrollLeft; }).observe(track);
  requestAnimationFrame(frame);
})();
