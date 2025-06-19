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

const isEscapeKey = (evt) => evt.key === 'Escape';

const toggleClass = (element, className) => {
  element.classList.toggle(className);
};

export { getRandomInRange, createRandomIdFromRangeGenerator, isEscapeKey, toggleClass };
