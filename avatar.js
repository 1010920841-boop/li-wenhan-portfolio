(() => {
  const video = document.querySelector('#avatar-video');
  const screen = video?.closest('.avatar-screen');
  if (!video || !screen) return;
  video.defaultMuted = true;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;

  let pending = false;
  let blocked = false;
  let visible = true;
  let reloads = 0;
  let generation = 0;
  let framePending = false;
  let lastTime = video.currentTime;
  let lastProgress = performance.now();
  const showPoster = () => screen.classList.remove('has-video-frame');

  function awaitFrame() {
    if (framePending) return;
    framePending = true;
    const token = generation;
    const reveal = () => {
      if (token !== generation) return;
      framePending = false;
      if (!video.paused && !video.error && video.readyState >= 2) {
        screen.classList.add('has-video-frame');
      }
    };
    if (typeof video.requestVideoFrameCallback === 'function') video.requestVideoFrameCallback(reveal);
    else requestAnimationFrame(reveal);
  }

  function start(userGesture = false) {
    if (userGesture) blocked = false;
    if (document.hidden || !visible || blocked || pending || video.error) return;
    if (!video.paused) { awaitFrame(); return; }
    pending = true;
    const token = generation;
    try {
      Promise.resolve(video.play()).then(() => {
        if (token === generation) awaitFrame();
      }).catch(error => {
        if (token !== generation) return;
        showPoster();
        if (error.name === 'NotAllowedError') blocked = true;
      }).finally(() => {
        if (token === generation) pending = false;
      });
    } catch {
      pending = false;
      showPoster();
    }
  }

  function recover() {
    showPoster();
    if (document.hidden || !visible || blocked || reloads >= 2) return;
    reloads++;
    generation++;
    pending = false;
    framePending = false;
    lastTime = 0;
    lastProgress = performance.now();
    video.load();
    start();
  }

  video.addEventListener('playing', () => { lastProgress = performance.now(); awaitFrame(); });
  video.addEventListener('canplay', () => start());
  video.addEventListener('loadeddata', () => start());
  video.addEventListener('emptied', showPoster);
  video.addEventListener('error', recover);
  video.addEventListener('waiting', () => { if (video.readyState < 2) showPoster(); });
  video.addEventListener('timeupdate', () => {
    if (video.currentTime !== lastTime) {
      lastTime = video.currentTime;
      lastProgress = performance.now();
    }
  });
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) { lastProgress = performance.now(); start(); }
  }).observe(video);
  function resume() {
    if (!document.hidden) { lastProgress = performance.now(); start(); }
  }
  document.addEventListener('visibilitychange', resume);
  window.addEventListener('pageshow', resume);
  document.addEventListener('pointerdown', () => start(true), { passive: true });
  document.addEventListener('keydown', () => start(true));

  // A pending play promise must not permanently prevent recovery.
  setInterval(() => {
    if (document.hidden || !visible) return;
    if (video.currentTime !== lastTime) {
      lastTime = video.currentTime;
      lastProgress = performance.now();
    } else if (!blocked && performance.now() - lastProgress > 6500) {
      recover();
    }
    start();
  }, 1500);
  start();
})();
