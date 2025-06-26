import { showBigPicture } from './render-big-picture.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnail = (thumbnail) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const imageElement = thumbnailElement.querySelector('.picture__img');

  imageElement.src = thumbnail.url;
  imageElement.alt = thumbnail.description;
  thumbnailElement.querySelector('.picture__comments').textContent = thumbnail.comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = thumbnail.likes;

  thumbnailElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(thumbnail);
  });

  return thumbnailElement;
};

const clearThumbnails = () => {
  document.querySelectorAll('a.picture').forEach((element) => element.remove());
};

const renderThumbnails = (thumbnails) => {
  clearThumbnails();
  thumbnailsContainer.querySelectorAll('.picture').forEach((element) => element.remove());
  const thumbnailsFragment = document.createDocumentFragment();

  thumbnails?.forEach((thumbnail) => {
    thumbnailsFragment.appendChild(renderThumbnail(thumbnail));
  });
  thumbnailsContainer.appendChild(thumbnailsFragment);
};

export { renderThumbnails };
