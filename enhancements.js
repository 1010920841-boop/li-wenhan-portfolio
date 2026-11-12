(() => {
  const nav = document.querySelector('.quick-nav');
  const hub = nav.querySelector('.back-to-top');
  const links = nav.querySelector('.quick-links');
  let leaveTimer;
  function openMenu(open) {
    clearTimeout(leaveTimer);
    nav.classList.toggle('is-open', open);
    hub.setAttribute('aria-expanded', String(open));
    links.inert = !open;
    links.setAttribute('aria-hidden', String(!open));
  }
  nav.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') openMenu(true); });
  nav.addEventListener('pointerleave', () => { leaveTimer = setTimeout(() => openMenu(false), 220); });
  nav.addEventListener('focusin', () => openMenu(true));
  nav.addEventListener('focusout', event => { if (!nav.contains(event.relatedTarget)) openMenu(false); });
  let touchWasOpen = false;
  hub.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') touchWasOpen = nav.classList.contains('is-open'); });
  hub.addEventListener('click', event => {
    if (matchMedia('(hover: none)').matches && !touchWasOpen) {
      event.preventDefault(); event.stopImmediatePropagation(); openMenu(true);
    }
  }, true);
  links.addEventListener('click', event => { if (event.target.closest('a')) openMenu(false); });
  document.addEventListener('pointerdown', event => { if (!nav.contains(event.target)) openMenu(false); });
  nav.addEventListener('keydown', event => {
    if (event.key === 'Escape') { hub.focus(); openMenu(false); }
  });

  const word = document.querySelector('#changing-word');
  const words = ['great', 'new', 'intelligent', 'interesting', 'unique'];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let length = words[0].length;
  let deleting = true;
  let timer;
  function tick() {
    if (document.hidden || reduceMotion.matches) return;
    if (deleting) {
      length--;
      word.textContent = words[index].slice(0, Math.max(0, length));
      if (length <= 0) { deleting = false; index = (index + 1) % words.length; timer = setTimeout(tick, 330); }
      else timer = setTimeout(tick, 75);
    } else {
      length++;
      word.textContent = words[index].slice(0, length);
      if (length >= words[index].length) { deleting = true; timer = setTimeout(tick, 1800); }
      else timer = setTimeout(tick, 120);
    }
  }
  function restart() {
    clearTimeout(timer);
    if (!document.hidden && !reduceMotion.matches) timer = setTimeout(tick, 1800);
    if (reduceMotion.matches) { index = 0; length = words[0].length; deleting = true; word.textContent = words[0]; }
  }
  document.addEventListener('visibilitychange', restart);
  reduceMotion.addEventListener('change', restart);
  restart();
})();

(() => {
  const target = document.querySelector('#about-changing-word');
  if (!target) return;
  const words = ['可用', '好用', '适用'];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let length = 0;
  let deleting = false;
  let timer;
  function tick() {
    if (document.hidden || reduced.matches) return;
    length += deleting ? -1 : 1;
    target.textContent = words[index].slice(0, length) || '__';
    let delay = deleting ? 220 : 300;
    if (length === words[index].length) {
      deleting = true;
      delay = 1600;
    } else if (length === 0) {
      deleting = false;
      index = (index + 1) % words.length;
      delay = 650;
    }
    timer = setTimeout(tick, delay);
  }
  function restart() {
    clearTimeout(timer);
    if (reduced.matches) {
      index = 0; length = 2; deleting = true;
      target.textContent = words[0];
    } else if (!document.hidden) {
      timer = setTimeout(tick, length === 0 ? 650 : 1000);
    }
  }
  document.addEventListener('visibilitychange', restart);
  reduced.addEventListener('change', restart);
  restart();
})();

(() => {
  const container = document.querySelector('.header-contact');
  const trigger = container.querySelector('.header-cta');
  const panel = container.querySelector('.header-contact-panel');
  const status = container.querySelector('.contact-copy-status');
  let closeTimer;
  function open(value) {
    clearTimeout(closeTimer);
    container.classList.toggle('is-open', value);
    trigger.setAttribute('aria-expanded', String(value));
    panel.hidden = !value;
  }
  container.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'touch') open(true);
  });
  container.addEventListener('pointerleave', () => {
    closeTimer = setTimeout(() => {
      if (!panel.contains(document.activeElement)) open(false);
    }, 220);
  });
  trigger.addEventListener('click', () => open(true));
  container.addEventListener('focusin', () => open(true));
  container.addEventListener('focusout', event => {
    if (!container.contains(event.relatedTarget)) open(false);
  });
  container.addEventListener('keydown', event => {
    if (event.key === 'Escape') { trigger.focus(); open(false); }
  });
  document.addEventListener('pointerdown', event => {
    if (!container.contains(event.target)) open(false);
  });
  async function copy(text) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch { /* Use a local-file-compatible fallback below. */ }
    const focused = document.activeElement;
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    panel.append(field);
    field.select();
    let success = false;
    try { success = document.execCommand('copy'); }
    catch { success = false; }
    finally { field.remove(); focused?.focus({ preventScroll: true }); }
    return success;
  }
  panel.querySelectorAll('[data-copy]').forEach(button => {
    let resetTimer;
    button.addEventListener('click', async () => {
      const success = await copy(button.dataset.copy);
      clearTimeout(resetTimer);
      button.textContent = success ? '已复制' : '重试';
      status.textContent = success ? '已复制到剪贴板' : '复制未成功，请选中左侧文字手动复制。';
      resetTimer = setTimeout(() => { button.textContent = '复制'; status.textContent = ''; }, 2200);
    });
  });
})();

(() => {
  const container = document.querySelector('.header-download');
  const trigger = container.querySelector('.download-trigger');
  const panel = container.querySelector('.download-panel');
  let closeTimer;
  function open(value) {
    clearTimeout(closeTimer);
    container.classList.toggle('is-open', value);
    trigger.setAttribute('aria-expanded', String(value));
    panel.hidden = !value;
  }
  container.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'touch') open(true);
  });
  container.addEventListener('pointerleave', () => {
    closeTimer = setTimeout(() => {
      if (!panel.contains(document.activeElement)) open(false);
    }, 220);
  });
  trigger.addEventListener('click', () => open(true));
  container.addEventListener('focusin', () => open(true));
  container.addEventListener('focusout', event => {
    if (!container.contains(event.relatedTarget)) open(false);
  });
  container.addEventListener('keydown', event => {
    if (event.key === 'Escape') { trigger.focus(); open(false); }
  });
  document.addEventListener('pointerdown', event => {
    if (!container.contains(event.target)) open(false);
  });
})();

(() => {
  const gallery = document.querySelector('#gallery');
  const cards = [...gallery.querySelectorAll(':scope > .work-placeholder')];
  if (cards.length !== 4 || gallery.children.length !== 4) return;
  gallery.classList.add('category-accordion');
  let hovered = -1;
  let selected = -1;
  let focused = -1;
  function render() {
    const active = hovered >= 0 ? hovered : focused >= 0 ? focused : selected;
    gallery.classList.toggle('has-active', active >= 0);
    if (active >= 0) gallery.dataset.active = String(active);
    else delete gallery.dataset.active;
    cards.forEach((card, index) => {
      card.classList.toggle('is-active', index === active);
      card.setAttribute('aria-expanded', String(index === active));
    });
  }
  cards.forEach((card, index) => {
    card.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') { hovered = index; render(); }
    });
    card.addEventListener('click', () => {
      selected = selected === index ? -1 : index;
      render();
    });
    card.addEventListener('focus', () => {
      if (card.matches(':focus-visible')) { focused = index; render(); }
    });
    card.addEventListener('blur', () => { focused = -1; render(); });
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); selected = selected === index ? -1 : index; render();
      }
    });
  });
  gallery.addEventListener('pointerleave', () => { hovered = -1; render(); });
  document.addEventListener('pointerdown', event => {
    if (!gallery.contains(event.target)) { selected = -1; focused = -1; hovered = -1; render(); }
  });
  gallery.addEventListener('keydown', event => {
    if (event.key === 'Escape') { selected = -1; focused = -1; hovered = -1; render(); }
  });
})();
