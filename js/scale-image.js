const negativeScale = -1;

const Zoom = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const previewContainer = document.querySelector('.img-upload__preview-container');
const imagePreview = previewContainer.querySelector('img');
const scaleControlValue = previewContainer.querySelector('.scale__control--value');

const changeZoom = (factor = 1) => {
  let size = parseInt(scaleControlValue.value, 10) + (Zoom.STEP * factor);

  if (size < Zoom.MIN) {
    size = Zoom.MIN;
  }

  if (size > Zoom.MAX) {
    size = Zoom.MAX;
  }

  scaleControlValue.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
};

const onMiniusButtonClick = () => {
  changeZoom(negativeScale);
};

const onPlusButtonClick = () => {
  changeZoom();
};

export { onMiniusButtonClick, onPlusButtonClick, changeZoom } ;
