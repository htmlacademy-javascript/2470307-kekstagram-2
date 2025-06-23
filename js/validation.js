import { numDecline } from './utils.js';

const MAX_LENGTH_DESCRIPTION = 140;
const MAX_HASHTAGS_COUNT = 5;

const HashtagLengthLimits = {
  MIN: 2,
  MAX: 20
};

const errorMessgeDescription = () => `Длина комментария не может составлять больше ${MAX_LENGTH_DESCRIPTION} символов`;

const isDescriptionValid = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

const parseHashtags = (value) => value.toLowerCase().trim().split(/\s+/);

let errorMessageHashtags = '';
const errorHashtags = () => errorMessageHashtags;

const isHashtagsValid = (value) => {
  errorMessageHashtags = '';

  if (!value || value.trim() === '') {
    return true;
  }

  const hashtags = parseHashtags(value);

  const rules = [
    {
      check: (item) => item.indexOf('#', 1) > 0,
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: (item) => item[0] !== '#',
      error: 'Хэш-тег должен начинаться с #'
    },
    {
      check: (item, index, arr) => arr.indexOf(item, index + 1) !== -1,
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: (item) => item.length > HashtagLengthLimits.MAX || item.length < HashtagLengthLimits.MIN,
      error: `Хэш-тег должен быть длиной от ${HashtagLengthLimits.MIN} до ${numDecline(HashtagLengthLimits.MAX, 'хэштега', 'хэштегов', 'хэштегов')}`
    },
    {
      check: () => hashtags.length > MAX_HASHTAGS_COUNT,
      error: `Максимум ${MAX_HASHTAGS_COUNT} хэш-тегов`
    },
    {
      check: (item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item),
      error: 'Хэш-тег содержит недопустимые символы'
    }
  ];

  return hashtags.every((hashtag, index, arr) =>
    rules.every((rule) => {
      const isInvalid = rule.check(hashtag, index, arr);
      if (isInvalid) {
        errorMessageHashtags = rule.error;
      }
      return !isInvalid;
    })
  );
};

export { isDescriptionValid, errorMessgeDescription, isHashtagsValid, errorHashtags};
