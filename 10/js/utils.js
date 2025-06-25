const isEscapeKey = (evt) => evt.key === 'Escape';

const toggleClass = (element, className) => {
  element.classList.toggle(className);
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  if (num % 10 === 0 || num % 100 > 4 && num % 100 < 21) {
    return genitivePlural;
  }
  return num % 10 === 1
    ? nominative
    : genitiveSingular;
};

export { isEscapeKey, toggleClass, numDecline };
