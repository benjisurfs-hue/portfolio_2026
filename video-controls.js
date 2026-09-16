document.querySelectorAll('.supplied-media video').forEach(video => {
  const figure = video.closest('figure');
  const timeline = video.closest('.timeline-demo-stage');
  let frame = timeline;
  if (!frame) {
    frame = document.createElement('div');
    frame.className = 'video-preview-frame';
    video.before(frame);
    frame.append(video);
  }
  const icon = document.createElement('button');
  icon.type = 'button';
  icon.className = 'video-preview-play';
  icon.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
  icon.setAttribute('aria-label', `Play ${video.getAttribute('aria-label') || 'video'}`);
  frame.append(icon);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'video-playback-button';
  const update = () => {
    icon.hidden = video.autoplay || !video.paused;
    button.textContent = video.paused ? 'Play video' : 'Pause video';
    button.setAttribute('aria-label', `${video.paused ? 'Play' : 'Pause'} ${video.getAttribute('aria-label') || 'video'}`);
  };
  const toggle = () => {
    if (video.paused) video.play().catch(update);
    else video.pause();
  };
  icon.addEventListener('click', toggle);
  button.addEventListener('click', toggle);
  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  figure.insertBefore(button, figure.querySelector('figcaption'));
  update();
});
