(() => {
  const card = document.querySelector('#photography-card');
  const dialog = document.querySelector('#photography-dialog');
  const main = dialog.querySelector('#photography-main');
  const caption = dialog.querySelector('.photography-caption');
  const thumbs = [...dialog.querySelectorAll('.photo-thumb')];
  let current = 0;
  function show(index) {
    current = (index + thumbs.length) % thumbs.length;
    const image = thumbs[current].querySelector('img');
    main.src = image.src;
    main.alt = image.alt;
    caption.textContent = `${String(current + 1).padStart(2, '0')} / ${thumbs.length} · ${image.alt}`;
    thumbs.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    const strip = dialog.querySelector('.photography-thumbs');
    const thumb = thumbs[current];
    strip.scrollTo({left: thumb.offsetLeft - strip.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: 'instant'});
  }
  function open() {
    if (dialog.open) return;
    dialog.showModal();
    show(current);
  }
  card.addEventListener('click', open);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
  });
  thumbs.forEach((button, i) => button.addEventListener('click', () => show(i)));
  dialog.querySelector('.photo-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.photo-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => card.focus({preventScroll:true}));
})();

(() => {
  const dialog = document.querySelector('#gallery-dialog');
  let opener = null;
  const entries = [
    ['#road-trip-card', '.road-trip-cover', '自驾旅行路线与里程', '自驾旅行 · 人 · 车 · 生活'],
  ];
  entries.forEach(([selector, imageSelector, label, caption]) => {
    const card = document.querySelector(selector);
    const cover = card.querySelector(imageSelector);
    function open() {
      if (dialog.open) return;
      opener = card;
      dialog.classList.add('road-trip-viewer');
      dialog.setAttribute('aria-label', label);
      const image = dialog.querySelector('img');
      image.src = cover.src;
      image.alt = cover.alt;
      dialog.querySelector('p').textContent = caption;
      dialog.showModal();
    }
    card.addEventListener('click', open);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
    });
  });
  dialog.addEventListener('close', () => {
    if (!opener) return;
    dialog.classList.remove('road-trip-viewer');
    dialog.setAttribute('aria-label', '作品预览');
    opener.focus({preventScroll:true});
    opener = null;
  });
})();

(() => {
  const card = document.querySelector('#rendering-card');
  const dialog = document.querySelector('#rendering-dialog');
  const main = dialog.querySelector('#rendering-main');
  const caption = dialog.querySelector('.photography-caption');
  const thumbs = [...dialog.querySelectorAll('.photo-thumb')];
  let current = 0;
  function show(index) {
    current = (index + thumbs.length) % thumbs.length;
    const image = thumbs[current].querySelector('img');
    main.src = image.src;
    main.alt = image.alt;
    caption.textContent = `${String(current + 1).padStart(2, '0')} / ${thumbs.length} · ${image.alt}`;
    thumbs.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    const strip = dialog.querySelector('.photography-thumbs');
    const thumb = thumbs[current];
    strip.scrollTo({left: thumb.offsetLeft - strip.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: 'instant'});
  }
  function open() {
    if (dialog.open) return;
    dialog.showModal();
    show(current);
  }
  card.addEventListener('click', open);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
  });
  thumbs.forEach((button, i) => button.addEventListener('click', () => show(i)));
  dialog.querySelector('.photo-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.photo-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => card.focus({preventScroll:true}));
})();

(() => {
  const card = document.querySelector('#architecture-card');
  const dialog = document.querySelector('#architecture-dialog');
  const main = dialog.querySelector('#architecture-main');
  const caption = dialog.querySelector('.photography-caption');
  const thumbs = [...dialog.querySelectorAll('.photo-thumb')];
  let current = 0;
  function show(index) {
    current = (index + thumbs.length) % thumbs.length;
    const image = thumbs[current].querySelector('img');
    main.src = image.src;
    main.alt = image.alt;
    caption.textContent = `${String(current + 1).padStart(2, '0')} / ${thumbs.length} · ${image.alt}`;
    thumbs.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    const strip = dialog.querySelector('.photography-thumbs');
    const thumb = thumbs[current];
    strip.scrollTo({left: thumb.offsetLeft - strip.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: 'instant'});
  }
  function open() {
    if (dialog.open) return;
    dialog.showModal();
    show(current);
  }
  card.addEventListener('click', open);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
  });
  thumbs.forEach((button, i) => button.addEventListener('click', () => show(i)));
  dialog.querySelector('.photo-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.photo-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('close', () => card.focus({preventScroll:true}));
})();
