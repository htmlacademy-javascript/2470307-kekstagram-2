import { addPhotos } from './create-array-miniatures.js';
import { renderThumbnails } from './render-thumbnails.js';
import { renderUploadForm } from './upload-photo-form.js';

const photos = [];

addPhotos(photos);

renderThumbnails(photos);

renderUploadForm();
