const soventureWalkthrough = document.querySelector('.soventure-journey .ft-walkthrough');
if (soventureWalkthrough) {
  const slides = [...soventureWalkthrough.querySelectorAll('.ft-walkthrough-slide')];
  const steps = [...soventureWalkthrough.querySelectorAll('.ft-walkthrough-steps button')];
  const previous = soventureWalkthrough.querySelector('.ft-walkthrough-prev');
  const next = soventureWalkthrough.querySelector('.ft-walkthrough-next');
  const counter = soventureWalkthrough.querySelector('.ft-walkthrough-count');
  const stage = soventureWalkthrough.querySelector('.ft-walkthrough-stage');
  let current = 0;

  function show(index) {
    if (index < 0 || index >= slides.length) return;
    current = index;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    steps.forEach((step, i) => {
      if (i === current) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    stage.textContent = slides[current].dataset.stage;
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    const strip = steps[current].parentElement;
    const selected = steps[current];
    if (selected.offsetLeft < strip.scrollLeft) strip.scrollLeft = selected.offsetLeft;
    else if (selected.offsetLeft + selected.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollLeft = selected.offsetLeft + selected.offsetWidth - strip.clientWidth;
    }
  }

  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  steps.forEach((step, index) => step.addEventListener('click', () => show(index)));
}
