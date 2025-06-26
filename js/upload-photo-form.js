
import '../vendor/pristine/pristine.min.js';
import { sendData } from './api.js';
import { resetEffect } from './effects-image.js';
import { notification } from './notifications.js';
import { onMiniusButtonClick, onPlusButtonClick, changeZoom } from './scale-image.js';
import { isEscapeKey, toggleClass, } from './utils.js';
import { isDescriptionValid, errorMessgeDescription, isHashtagsValid, geterrorMessageHashtags} from './validation.js';

const PRIORITY_PRISTINE = 2;
const DEFAULT_SCALE = 100;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Отправляю...',
};


const uploadImageForm = document.querySelector('.img-upload__form');
const uploadInputImage = uploadImageForm.querySelector('.img-upload__input');
const uploadOverlayImage = uploadImageForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadImageForm.querySelector('.img-upload__cancel');
const submitButton = uploadImageForm.querySelector('.img-upload__submit');
const hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
const descriptionInput = uploadImageForm.querySelector('.text__description');

const scaleSmaller = uploadImageForm.querySelector('.scale__control--smaller');
const scaleBigger = uploadImageForm.querySelector('.scale__control--bigger');
const previewImage = uploadImageForm.querySelector('.img-upload__preview img');

const effectLevelContainer = uploadImageForm.querySelector('.img-upload__effect-level');
const effectsList = uploadImageForm.querySelector('.effects__list');
const effectsPreviewElements = uploadImageForm.querySelectorAll('.effects__preview');

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
    uploadInputImage.value = '';
    previewImage.src = 'img/upload-default-image.jpg';
    changeZoom(DEFAULT_SCALE);
    resetEffect();
    effectLevelContainer.style.display = 'none';
  }
};

const onUploadFormEscapeKeyDown = (evt) => {
  evt.stopPropagation();
  if (
    isEscapeKey(evt) &&
    !document.body.classList.contains('notification-open') &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')
  ) {
    closeUploadForm();
    document.removeEventListener('keydown', onUploadFormEscapeKeyDown);
  }
};

const openUploadForm = () => {
  if (uploadOverlayImage.classList.contains('hidden')) {
    toggleUploadForm();
    document.addEventListener('keydown', onUploadFormEscapeKeyDown);
    changeZoom(DEFAULT_SCALE);
    resetEffect();
    effectLevelContainer.style.display = 'none';
    submitButton.disabled = false;
  }
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    submitButton.textContent = SubmitButtonText.SENDING;
    sendData(new FormData(uploadImageForm))
      .then(() => {
        notification.success();
        closeUploadForm();
      })
      .catch(() => {
        notification.error();
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = SubmitButtonText.DEFAULT;
      });
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
      const file = uploadInputImage.files[0];
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.split('.').pop();
      if (!FILE_TYPES.includes(fileExtension)) {
        notification.error('Недопустимый формат файла. Используйте JPG, JPEG или PNG.');
        uploadInputImage.value = '';
        return;
      }
      const url = URL.createObjectURL(file);
      previewImage.src = url;
      effectsPreviewElements.forEach((preview) => {
        preview.style.backgroundImage = `url(${url})`;
      });
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
