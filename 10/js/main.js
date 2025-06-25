import { renderThumbnails } from './render-thumbnails.js';
import { renderUploadForm } from './upload-photo-form.js';
import { getData } from './api.js';
import { notification } from './notifications.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderThumbnails(photos);
};

const onFail = () => {
  notification.dataError({ message: 'Ошибка загрузки фотографий.' });
};

getData()
  .then(onSuccess)
  .catch(onFail);

renderUploadForm();
