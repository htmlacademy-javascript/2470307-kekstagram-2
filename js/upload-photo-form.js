
import '../vendor/pristine/pristine.min.js';
import { isDescriptionValid, errorMessgeDescription, isHashtagsValid, geterrorMessageHashtags} from './validation.js';
import { isEscapeKey, toggleClass, } from './utils.js';
import { initSlider, resetEffect } from './effects-image.js';
import { onMiniusButtonClick, onPlusButtonClick, changeZoom } from './scale-image.js';

const PRIORITY_PRISTINE = 2;
const DEFAULT_SCALE = 100;


const uploadImageForm = document.querySelector('.img-upload__form');
const uploadInputImage = uploadImageForm.querySelector('.img-upload__input');
const uploadOverlayImage = uploadImageForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadImageForm.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
const descriptionInput = uploadImageForm.querySelector('.text__description');

const scaleSmaller = uploadImageForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadImageForm.querySelector('.scale__control--bigger');

const effectLevelContainer = uploadImageForm.querySelector('.img-upload__effect-level');
const effectsList = uploadImageForm.querySelector('.effects__list');

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const toggleUploadForm = () => {
  toggleClass(uploadOverlayImage, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const closeUploadForm = () => {
  if (!uploadOverlayImage.classList.contains('hidden')) {
    toggleUploadForm();
    uploadImageForm.reset();
    pristine.reset();
    submitButton.disabled = true;
    changeZoom(DEFAULT_SCALE);
    resetEffect();
    effectLevelContainer.style.display = 'none';
  }
};

const onUploadFormEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== hashtagsInput && document.activeElement !== descriptionInput) {
    closeUploadForm();
    document.removeEventListener('keydown', onUploadFormEscapeKeyDown);
  }
};

const openUploadForm = () => {
  if (uploadOverlayImage.classList.contains('hidden')) {
    toggleUploadForm();
    document.addEventListener('keydown', onUploadFormEscapeKeyDown);
    changeZoom(DEFAULT_SCALE);
    initSlider();
    resetEffect();
    effectLevelContainer.style.display = 'none';
  }
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadImageForm.submit();
  }
};

const onHashtagInput = () => {
  submitButton.disabled = !pristine.validate();
};

const onDescriptionInput = () => {
  submitButton.disabled = !pristine.validate();
};

const renderUploadForm = () => {
  effectsList.addEventListener('change', (evt) => {
    if (evt.target.matches('.effects__radio')) {
      resetEffect();
    }
  });
  uploadInputImage.addEventListener('change', () => {
    if (uploadInputImage.files.length > 0) {
      openUploadForm();
    }
  });

  uploadCancelButton.addEventListener('click', () => {
    closeUploadForm();
    document.removeEventListener('keydown', onUploadFormEscapeKeyDown);
  });

  uploadImageForm.addEventListener('submit', onUploadFormSubmit);
};

pristine.addValidator(descriptionInput, isDescriptionValid, errorMessgeDescription, PRIORITY_PRISTINE, false);
pristine.addValidator(hashtagsInput, isHashtagsValid, geterrorMessageHashtags, PRIORITY_PRISTINE, false);

hashtagsInput.addEventListener('input', onHashtagInput);
descriptionInput.addEventListener('input', onDescriptionInput);

scaleSmaller.addEventListener('click', onMiniusButtonClick);
scaleBigger.addEventListener('click', onPlusButtonClick);

export { renderUploadForm };
