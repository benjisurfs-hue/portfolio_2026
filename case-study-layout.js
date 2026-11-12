/* Restart animated demos from their first frame. */
document.querySelectorAll('.motion-toggle').forEach(button => {
  const image = button.parentElement.querySelector('img');
  const video = button.parentElement.querySelector('video');
  let restartCount = 0;
  button.addEventListener('click', () => {
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
      return;
    }
    const source = new URL(image.dataset.motionSrc, document.baseURI);
    source.searchParams.set('restart', `${Date.now()}-${++restartCount}`);
    image.src = source.href;
  });
});
document.querySelectorAll('.design-gallery').forEach(gallery => {
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const thumbnails = [...gallery.querySelectorAll('.gallery-thumbnails button')];
  const screens = slides.map(slide => ({
    title: slide.querySelector('h3').textContent,
    image: slide.querySelector('img').cloneNode(true),
    caption: slide.querySelector('figcaption').innerHTML
  }));
  gallery.imageScreens = screens;
  const main = slides[0];
  const heading = main.querySelector('h3');
  const image = main.querySelector('img');
  const link = image.parentElement;
  const caption = main.querySelector('figcaption');
  caption.setAttribute('aria-live', 'polite');
  slides.slice(1).forEach(slide => slide.remove());
  thumbnails.forEach((button, index) => {
    button.setAttribute('aria-controls', main.id);
    button.addEventListener('click', () => {
      const screen = screens[index];
      heading.textContent = screen.title;
      ['src', 'alt', 'width', 'height'].forEach(attribute => {
        image.setAttribute(attribute, screen.image.getAttribute(attribute));
      });
      image.loading = 'eager';
      link.href = screen.image.getAttribute('src');
      caption.innerHTML = screen.caption;
      thumbnails.forEach((thumbnail, i) => {
        thumbnail.setAttribute('aria-pressed', String(i === index));
      });
    });
  });
});

/* Keep video playback controls below the demo, without a native overlay. */
document.querySelectorAll('.case-hero-wide').forEach(hero => {
  const video = hero.querySelector('video');
  const toggle = hero.querySelector('.video-demo-toggle');
  const restart = hero.querySelector('.video-demo-restart');
  if (!video || !toggle || !restart) return;
  const update = () => { toggle.textContent = video.paused ? 'Play demo' : 'Pause demo'; };
  const play = () => { video.play().catch(update); };
  toggle.addEventListener('click', () => { if (video.paused) play(); else video.pause(); });
  restart.addEventListener('click', () => { video.currentTime = 0; play(); });
  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  update();
  play();
});
