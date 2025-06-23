
import '../vendor/pristine/pristine.min.js';
import { isDescriptionValid, errorMessgeDescription, isHashtagsValid, errorHashtags} from './validation.js';
import { isEscapeKey, toggleClass, } from './utils.js';

const PRIORITY_PRISTINE = 2;

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadInputImage = uploadImageForm.querySelector('.img-upload__input');
const uploadOverlayImage = uploadImageForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadImageForm.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagsInput = uploadImageForm.querySelector('.text__hashtags');
const descriptionInput = uploadImageForm.querySelector('.text__description');

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(descriptionInput, isDescriptionValid, errorMessgeDescription, PRIORITY_PRISTINE, false);

pristine.addValidator(hashtagsInput, isHashtagsValid, errorHashtags, PRIORITY_PRISTINE, false);

const toggleUploadForm = () => {
  toggleClass(uploadOverlayImage, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const closeUploadForm = () => {
  if (!uploadOverlayImage.classList.contains('hidden')) {
    toggleUploadForm();
    uploadImageForm.reset();
    pristine.reset();
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

hashtagsInput.addEventListener('input', onHashtagInput);
descriptionInput.addEventListener('input', onDescriptionInput);

export { renderUploadForm };
