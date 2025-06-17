import {dataArray} from './data.js';
import {getRandomInRange, createRandomIdFromRangeGenerator} from './utils.js';

const PHOTO_COUNT = 25;

const INDEX_MAX_RANGE = 10;

const LikesQuantity = {
  MIN: 15,
  MAX: 200
};

const CommentsQuantity = {
  MIN: 0,
  MAX: 30
};

const AvatarsQuantity = {
  MIN: 1,
  MAX: 6
};

const RandomIndexRangeMessageQuantity = {
  MIN: 1,
  MAX: 2
};

const {arrayMessages, arrayNames, arrayDescriptions} = dataArray();

const addIdComment = (index = 1) => {
  const randomId = createRandomIdFromRangeGenerator(index, index * INDEX_MAX_RANGE);

  return randomId;
};

const addMessage = () => {
  const currentMessageQuantity = getRandomInRange(RandomIndexRangeMessageQuantity.MIN, RandomIndexRangeMessageQuantity.MAX);

  const randomMessage = arrayMessages[getRandomInRange(0, arrayMessages.length - 1)];

  const resultMessage = (currentMessageQuantity === 2) ? `${randomMessage} ${randomMessage}` : `${randomMessage}`;

  return resultMessage;
};

const addComment = (index = 0) => ({
  id: addIdComment(index + 1),
  avatar: `img/avatar-${getRandomInRange(AvatarsQuantity.MIN, AvatarsQuantity.MAX)}.svg`,
  message: addMessage(),
  name: arrayNames[getRandomInRange(0, arrayNames.length - 1)],
});

const addComments = () => {
  const comments = [];

  const randomCommentsCount = getRandomInRange(CommentsQuantity.MIN, CommentsQuantity.MAX);

  for (let i = 0; i < randomCommentsCount; ++i) {
    comments.push(addComment(i));
  }

  return comments;
};

const addDescription = () => {
  const randomDescription = arrayDescriptions[getRandomInRange(0, arrayDescriptions.length - 1)];

  return randomDescription;
};

const addPhoto = (index = 0) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: addDescription(),
  likes: getRandomInRange(LikesQuantity.MIN, LikesQuantity.MAX),
  comments: addComments(),
});

const addPhotos = (photos) => {
  for (let i = 0; i < PHOTO_COUNT; ++i) {
    photos.push(addPhoto(i));
  }

  return photos;
};

export { addPhotos };
