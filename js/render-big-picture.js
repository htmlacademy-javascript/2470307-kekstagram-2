import { isEscapeKey, toggleClass } from './utils.js';

const COMMENTS_PER_PAGE = 5;

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureModal.querySelector('.social__caption');
const bigPictureLikesCount = bigPictureModal.querySelector('.likes-count');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const socialCommentShownCount = bigPictureModal.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = bigPictureModal.querySelector('.social__comment-total-count');
const loadButton = bigPictureModal.querySelector('.comments-loader');
const closeButton = bigPictureModal.querySelector('.big-picture__cancel');
const commentFragment = document.createDocumentFragment();

let currentComments = [];
let visibleComments = COMMENTS_PER_PAGE;

const toggleModalClass = () => {
  toggleClass(bigPictureModal, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const renderComment = ({ avatar, name, message }) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = avatar;
  avatarImg.alt = name;
  avatarImg.width = 35;
  avatarImg.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  newComment.appendChild(avatarImg);
  newComment.appendChild(text);

  return newComment;
};

const addComments = () => {
  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }

  visibleComments = Math.min(visibleComments, currentComments.length);

  for (let i = 0; i < visibleComments; i++) {
    commentFragment.appendChild(renderComment(currentComments[i]));
  }

  commentsContainer.appendChild(commentFragment);

  socialCommentShownCount.textContent = String(visibleComments);
  socialCommentTotalCount.textContent = String(currentComments.length);

  loadButton.classList.toggle('hidden', visibleComments >= currentComments.length);
};

const bigPictureData = (pictureData) => {
  const { url, likes, description } = pictureData;
  bigPictureImage.src = url;
  bigPictureImage.alt = description || '';
  bigPictureLikesCount.textContent = String(likes);
  bigPictureCaption.textContent = description || '';
};

function closeBigPictureModal () {
  document.removeEventListener('keydown', onBigPictureEscapeKeyDown);
  visibleComments = COMMENTS_PER_PAGE;
  currentComments = [];
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

const onLoadButtonClick = () => {
  visibleComments += COMMENTS_PER_PAGE;
  addComments();
};

const showBigPicture = (pictureData) => {
  currentComments = Array.isArray(pictureData.comments) ? pictureData.comments.slice() : [];
  visibleComments = COMMENTS_PER_PAGE;
  bigPictureData(pictureData);
  addComments();
  document.addEventListener('keydown', onBigPictureEscapeKeyDown);
  toggleModalClass();
};

closeButton.addEventListener('click', onCloseButtonClick);
loadButton.addEventListener('click', onLoadButtonClick);

export { showBigPicture };
