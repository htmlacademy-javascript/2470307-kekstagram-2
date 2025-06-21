import { isEscapeKey, toggleClass } from './utils.js';

const COMMENTS_PER_PAGE = 5;

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureModal.querySelector('.social__caption');
const bigPictureLikesCount = bigPictureModal.querySelector('.likes-count');
const socialComment = bigPictureModal.querySelector('.social__comment');
const bigPictureCommentsCount = bigPictureModal.querySelector('.social__comment-count');
const loadButton = bigPictureModal.querySelector('.comments-loader');
const closeButton = bigPictureModal.querySelector('.big-picture__cancel');
const commentFragment = document.createDocumentFragment();

let currentComments = [];
let vissibleComments = COMMENTS_PER_PAGE;

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
  newComment.classList.remove('hidden');

  return newComment;
};

const addComments = () => {
  const commentsContainer = bigPictureModal.querySelector('.social__comments');

  commentsContainer.innerHTML = '';
  bigPictureCommentsCount.innerHTML = '';

  vissibleComments = Math.min(vissibleComments, currentComments.length);
  for (let i = 0; i < vissibleComments; i++) {
    commentFragment.appendChild(renderComment(currentComments[i]));
  }

  bigPictureCommentsCount.innerHTML = `${vissibleComments} из <span class="comments-count">${currentComments.length}</span> комментариев`;
  commentsContainer.appendChild(commentFragment);

  if (currentComments.length <= COMMENTS_PER_PAGE || vissibleComments >= currentComments.length) {
    loadButton.classList.add('hidden');
  } else {
    loadButton.classList.remove('hidden');
  }
};

const bigPictureData = (pictureData) => {
  const {url, likes, description} = pictureData;

  bigPictureImage.src = url;
  bigPictureCaption.textContent = description;
  bigPictureLikesCount.textContent = likes;
};

function closeBigPictureModal () {
  document.removeEventListener('keydown', onBigPictureEscapeKeyDown);
  vissibleComments = COMMENTS_PER_PAGE;
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
  vissibleComments += COMMENTS_PER_PAGE;
  addComments();
};

const showBigPicture = (pictureData) => {
  currentComments = pictureData.comments.slice();
  vissibleComments = COMMENTS_PER_PAGE;
  bigPictureData(pictureData);
  addComments();
  bigPictureCommentsCount.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscapeKeyDown);
  toggleModalClass();
};

closeButton.addEventListener('click', onCloseButtonClick);
loadButton.addEventListener('click', onLoadButtonClick);

export { showBigPicture };
