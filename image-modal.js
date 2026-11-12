/* Shared image viewer, including every screen in the thumbnail galleries. */
(() => {
  const isImageLink = link => {
    if (!link || link.hasAttribute('download')) return false;
    const url = new URL(link.href, document.baseURI);
    return url.origin === location.origin && /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(url.pathname);
  };
  document.querySelectorAll('a[href]').forEach(link => {
    if (!isImageLink(link)) return;
    link.removeAttribute('target');
    link.setAttribute('aria-haspopup', 'dialog');
  });
  const dialog = document.createElement('dialog');
  dialog.className = 'portfolio-image-modal';
  dialog.setAttribute('aria-labelledby', 'portfolio-image-modal-title');
  dialog.innerHTML = `<div class="portfolio-image-modal-header"><h2 id="portfolio-image-modal-title">Enlarged image</h2><button type="button" class="portfolio-image-close" aria-label="Close enlarged image" autofocus>Close ×</button></div><div class="portfolio-image-viewport" tabindex="0" role="region" aria-label="Enlarged image"><img alt=""></div><nav class="portfolio-image-navigation" aria-label="Image navigation"><button type="button" class="portfolio-image-previous">← Previous</button><span class="portfolio-image-position" aria-live="polite" aria-atomic="true"></span><button type="button" class="portfolio-image-next">Next →</button></nav>`;
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  const close = dialog.querySelector('.portfolio-image-close');
  const previous = dialog.querySelector('.portfolio-image-previous');
  const next = dialog.querySelector('.portfolio-image-next');
  const viewport = dialog.querySelector('.portfolio-image-viewport');
  let opener, previousOverflow;
  let outsidePointerDown = false;
  let screens = [];
  let current = 0;
  const collectScreens = link => {
    const gallery = link.closest('#design .design-gallery');
    if (gallery?.imageScreens) {
      return gallery.imageScreens.map(screen => ({
        src: screen.image.src, alt: screen.image.alt, title: screen.title
      }));
    }
    const figure = link.closest('figure');
    return [{
      src: link.href,
      alt: figure?.querySelector('img')?.alt || 'Enlarged portfolio image',
      title: figure?.querySelector('h3')?.textContent || 'Enlarged image'
    }];
  };
  const show = index => {
    if (index < 0 || index >= screens.length) return;
    current = index;
    image.alt = screens[index].alt;
    image.src = screens[index].src;
    dialog.querySelector('h2').textContent = screens[index].title;
    dialog.querySelector('.portfolio-image-position').textContent = `${index + 1} / ${screens.length}`;
    previous.disabled = index === 0;
    next.disabled = index === screens.length - 1;
    viewport.scrollTo(0, 0);
  };
  const outside = event => {
    const r = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom);
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !isImageLink(link)) return;
    event.preventDefault();
    opener = link;
    screens = collectScreens(link);
    dialog.querySelector('.portfolio-image-navigation').hidden = screens.length < 2;
    let index = screens.findIndex(screen => screen.src === link.href);
    if (index < 0) {
      screens.push({ src: link.href, alt: link.querySelector('img')?.alt || 'Enlarged portfolio image', title: 'Enlarged image' });
      index = screens.length - 1;
    }
    show(index);
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    close.focus({ preventScroll: true });
  });
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('pointerdown', event => { outsidePointerDown = outside(event); });
  dialog.addEventListener('click', event => { if (outsidePointerDown && outside(event)) dialog.close(); outsidePointerDown = false; });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    image.removeAttribute('src');
    opener?.focus({ preventScroll: true });
  });
})();
