const arrayMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const arrayNames = [
  'Андрей',
  'Женя',
  'Настя',
  'Паша',
  'Ксюша',
  'master225',
  'Сергей',
  'Дима',
  'Олег',
  'criti78',
  'Антон',
  'Денис',
  'Карина',
  'Полина',
  'Маша',
  'Саша',
];

const arrayDescriptions = [
  'Солнечное утро',
  'Прекрасный завтрак',
  'Такое не должно повториться!',
  'Мой день рождения',
  'Пляж',
  'Горы',
  '#СолнечнаяПогода',
  'Помыл машину',
  'Подсолнухи',
  'Мы вместе!',
  'Каждый день - новая страна!',
  'Ночной город - прекрасен',
];

const likesQuantity = {
  MIN: 15,
  MAX: 200
};

const commentsQuantity = {
  MIN: 0,
  MAX: 30
};

const avatarsQuantity = {
  MIN: 1,
  MAX: 6
};

const randomIndexRangeMessageQuantity = {
  MIN: 1,
  MAX: 2
};

const PHOTO_COUNT = 25;

const INDEX_MAX_RANGE = 10;

const photos = [];

const getRandomInRange = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1)) + min;

const createRandomIdFromRangeGenerator = (min = 0, max = 1) => {
  const previousValues = [];

  let currentValue = getRandomInRange(min, max);

  while (previousValues.includes(currentValue)) {
    currentValue = getRandomInRange(min, max);
  }
  previousValues.push(currentValue);
  return currentValue;
};

const addIdComment = (index = 1) => {
  const randomId = createRandomIdFromRangeGenerator(index, index * INDEX_MAX_RANGE);

  return randomId;
};

const addMessage = () => {
  const currentMessageQuantity = getRandomInRange(randomIndexRangeMessageQuantity.MIN, randomIndexRangeMessageQuantity.MAX);

  const randomMessage = arrayMessages[getRandomInRange(0, arrayMessages.length - 1)];

  const resultMessage = (currentMessageQuantity === 2) ? `${randomMessage} ${randomMessage}` : `${randomMessage}`;

  return resultMessage;
};

const addComment = (index = 0) => ({
  id: addIdComment(index + 1),
  avatar: `img/avatar-${getRandomInRange(avatarsQuantity.MIN, avatarsQuantity.MAX)}.svg`,
  message: addMessage(),
  name: arrayNames[getRandomInRange(0, arrayNames.length - 1)],
});

const addComments = () => {
  const comments = [];

  const randomCommentsCount = getRandomInRange(commentsQuantity.MIN, commentsQuantity.MAX);

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
  likes: getRandomInRange(likesQuantity.MIN, likesQuantity.MAX),
  comments: addComments(),
});

const addPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; ++i) {
    photos.push(addPhoto(i));
  }

  return photos;
};

addPhotos();
