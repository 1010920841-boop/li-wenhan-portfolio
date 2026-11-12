(() => {
  const folds = [...document.querySelectorAll('main > section')].filter(s => s.querySelector('.fold-panel'));
  // Explicitly closed panels stay closed until their title or navigation link is used.
  const manualClosed = new Set();
  function setOpen(section, open) {
    section.classList.toggle('is-expanded', open);
    const panel = section.querySelector('.fold-panel');
    panel.inert = !open;
    panel.setAttribute('aria-hidden', String(!open));
    section.querySelector('.fold-toggle').setAttribute('aria-expanded', String(open));
    window.dispatchEvent(new Event('resize'));
  }
  folds.forEach(section => {
    section.classList.add('auto-fold');
    setOpen(section, false);
    section.querySelector('.fold-toggle').addEventListener('click', () => {
      const open = !section.classList.contains('is-expanded');
      if (open) manualClosed.delete(section); else manualClosed.add(section);
      setOpen(section, open);
    });
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !manualClosed.has(entry.target)) setOpen(entry.target, true);
    });
  }, { rootMargin: '0px 0px -22% 0px', threshold: 0.01 });
  folds.forEach(section => observer.observe(section));
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const hash = link.getAttribute('href');
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      if (folds.includes(target)) { manualClosed.delete(target); setOpen(target, true); }
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      history.replaceState(null, '', hash);
    });
  });
  const initial = document.getElementById(location.hash.slice(1));
  if (folds.includes(initial)) {
    setOpen(initial, true);
    initial.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
})();
