(() => {
  const root = document.documentElement;
  function fit() {
    const scale = root.clientWidth / 1440;
    root.style.setProperty('--page-scale', String(scale));
  }
  fit();
  window.addEventListener('resize', fit, {passive:true});
  window.addEventListener('pageshow', fit);
})();
