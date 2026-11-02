const imageTrigger = document.querySelector('.conversation-image-open');
const imageDialog = document.querySelector('#conversation-image-dialog');
if (imageTrigger && imageDialog) {
  imageTrigger.addEventListener('click', () => imageDialog.showModal());
  imageDialog.querySelector('.image-dialog-close').addEventListener('click', () => imageDialog.close());
  imageDialog.addEventListener('click', event => {
    if (event.target !== imageDialog) return;
    const bounds = imageDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) imageDialog.close();
  });
  imageDialog.addEventListener('close', () => imageTrigger.focus({ preventScroll: true }));
}
