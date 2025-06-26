import { renderThumbnails } from './render-thumbnails.js';
import { renderUploadForm } from './upload-photo-form.js';
import { getData } from './api.js';
import { notification } from './notifications.js';
import { initSlider } from './effects-image.js';
import { initializeFilters } from './filters.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderThumbnails(photos);
  document.querySelector('.img-filters')?.classList.remove('img-filters--inactive');
  initializeFilters(photos, renderThumbnails);
};

const onFail = () => {
  notification.dataError({ message: 'Ошибка загрузки фотографий.' });
};

getData()
  .then(onSuccess)
  .catch(onFail);


initSlider();
renderUploadForm();
