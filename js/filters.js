import { applyDebounce } from './utils.js';

const MAX_RANDOM_COUNT = 10;
const RENDER_DELAY = 500;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const FilterNames = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterFunctions = {
  showDefault: (photos) => photos.slice(),
  showRandom: (photos) => {
    const shuffled = photos.slice();
    const results = [];
    while (results.length < Math.min(MAX_RANDOM_COUNT, shuffled.length)) {
      const index = Math.floor(Math.random() * shuffled.length);
      results.push(shuffled.splice(index, 1)[0]);
    }
    return results;
  },
  showDiscussed: (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length)
};

const filtersSectionElement = document.querySelector('.img-filters');
const filtersContainerElement = filtersSectionElement.querySelector('.img-filters__form');
let activeFilterElement = filtersContainerElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

let posts = [];

const clearThumbnails = () => {
  document.querySelectorAll('a.picture').forEach((element) => element.remove());
};

const useFilter = (filterName, renderThumbnailsFunction) => {
  let sortFunction = filterFunctions.showDefault;

  switch (filterName) {
    case FilterNames.RANDOM:
      sortFunction = filterFunctions.showRandom;
      break;
    case FilterNames.DISCUSSED:
      sortFunction = filterFunctions.showDiscussed;
      break;
  }

  clearThumbnails();
  renderThumbnailsFunction(sortFunction(posts));
};

const handleFiltersContainerClick = (evt, renderThumbnailsFunction) => {
  const targetFilterElement = evt.target.closest('.img-filters__button');

  if (targetFilterElement && targetFilterElement !== activeFilterElement) {
    activeFilterElement.classList.remove(ACTIVE_BUTTON_CLASS);
    targetFilterElement.classList.add(ACTIVE_BUTTON_CLASS);
    activeFilterElement = targetFilterElement;

    useFilter(targetFilterElement.id, renderThumbnailsFunction);
  }
};

const initializeFilters = (data, renderThumbnailsFunction) => {
  posts = data;
  const renderThumbnailsDebounced = applyDebounce(renderThumbnailsFunction, RENDER_DELAY);
  filtersContainerElement.addEventListener('click', (evt) => handleFiltersContainerClick (evt, renderThumbnailsDebounced));
  renderThumbnailsFunction(data);
};

export { initializeFilters };
