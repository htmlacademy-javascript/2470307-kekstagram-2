import { isEscapeKey, toggleClass } from './utils.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureModal.querySelector('.social__caption');
const bigPictureLikesCount = bigPictureModal.querySelector('.likes-count');
const socialComment = bigPictureModal.querySelector('.social__comment');
const loadButton = bigPictureModal.querySelector('.comments-loader');
const closeButton = bigPictureModal.querySelector('.big-picture__cancel');
const commentFragment = document.createDocumentFragment();

let currentComments = [];

const toggleModalClass = () => {
  toggleClass(bigPictureModal, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const renderComment = (comment) => {
  const newComment = socialComment.cloneNode(true);
  const userAvatar = newComment.querySelector('.social__picture');

  userAvatar.src = comment.avatar;
  userAvatar.alt = comment.name;

  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const addComments = () => {
  const commentsContainer = bigPictureModal.querySelector('.social__comments');
  const commentsCountElement = bigPictureModal.querySelector('.social__comment-count');

  commentsContainer.innerHTML = '';
  commentsCountElement.innerHTML = '';

  currentComments.forEach((comment) => {
    commentFragment.appendChild(renderComment(comment));
  });

  commentsCountElement.innerHTML = `${currentComments.length} из <span class="comments-count">${currentComments.length}</span> комментариев`;
  commentsContainer.appendChild(commentFragment);
};

const bigPictureData = (pictureData) => {
  const {url, likes, description} = pictureData;

  bigPictureImage.src = url;
  bigPictureCaption.textContent = description;
  bigPictureLikesCount.textContent = likes;
};

function closeBigPictureModal () {
  document.removeEventListener('keydown', onBigPictureEscapeKeyDown);
  toggleModalClass();
}

function onBigPictureEscapeKeyDown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
}

const onCloseButtonClick = () => {
  closeBigPictureModal();
};

const showBigPicture = (pictureData) => {
  currentComments = pictureData.comments.slice();
  bigPictureData(pictureData);
  addComments();
  bigPictureModal.querySelector('.social__comment-count').classList.add('hidden');
  loadButton.classList.add('hidden');
  document.addEventListener('keydown', onBigPictureEscapeKeyDown);
  toggleModalClass();
};

closeButton.addEventListener('click', onCloseButtonClick);

export { showBigPicture };
