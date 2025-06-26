import { numDecline } from './utils.js';

const MAX_LENGTH_DESCRIPTION = 140;
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const HashtagLengthLimits = {
  MIN: 2,
  MAX: 20
};

const errorMessgeDescription = () => `Длина комментария не может составлять больше ${MAX_LENGTH_DESCRIPTION} символов`;

const isDescriptionValid = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

let errorMessageHashtags = '';
const geterrorMessageHashtags = () => errorMessageHashtags;

const isHashtagsValid = (value) => {
  errorMessageHashtags = '';

  const inputText = value.toLowerCase().trim();

  if (!value || value.trim() === '') {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 0),
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с #'
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: inputArray.some((item) => item.length > HashtagLengthLimits.MAX || item.length < HashtagLengthLimits.MIN),
      error: `Хэш-тег должен быть длиной от ${HashtagLengthLimits.MIN} до ${HashtagLengthLimits.MAX} символов`
    },
    {
      check: inputArray.length > MAX_HASHTAGS_COUNT,
      error: `Максимум ${MAX_HASHTAGS_COUNT} ${numDecline(MAX_HASHTAGS_COUNT, 'хэштега', 'хэштегов', 'хэштегов')}`
    },
    {
      check: inputArray.some((item) => !HASHTAG_REGEXP.test(item)),
      error: 'Хэш-тег содержит недопустимые символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessageHashtags = rule.error;
    }
    return !isInvalid;
  });
};

export { isDescriptionValid, errorMessgeDescription, isHashtagsValid, geterrorMessageHashtags};
