import { shuffle, isFunction, debounce } from '../utils.js';

const DEBOUNCE_TIME = 500;
const RANDOM_PICTURES_AMOUNT = 10;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const filterNode = document.querySelector('.img-filters');
const defaultButtonNode =  filterNode.querySelector('#filter-default');

let activeButtonNode = null;
let initialPictures = [];
let renderPictures = null;

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const setActiveButtonNode = (node) => {
  if (activeButtonNode) {
    activeButtonNode.classList.remove(ACTIVE_BUTTON_CLASS);
  }

  activeButtonNode = node;
  activeButtonNode.classList.add(ACTIVE_BUTTON_CLASS);
};

const applyFilter = debounce((filter) => {
  let filteredPictures = [...initialPictures];
  switch (filter) {
    case 'filter-random':
      filteredPictures = shuffle(filteredPictures).slice(0, RANDOM_PICTURES_AMOUNT);
      break;
    case 'filter-discussed':
      filteredPictures.sort(sortByComments);
      break;
  }

  if (isFunction(renderPictures)) {
    renderPictures(filteredPictures);
  }
}, DEBOUNCE_TIME);

const onFilterNodeClick = (evt) => {
  const buttonNode = evt.target.closest('.img-filters__button');
  if (buttonNode && evt.currentTarget.contains(buttonNode)) {
    setActiveButtonNode(buttonNode);
    const filter = buttonNode.id;
    applyFilter(filter);
  }
};

export const initFilter = (pictures, cb) => {
  initialPictures = pictures;
  renderPictures = cb;

  filterNode.classList.remove('img-filters--inactive');
  filterNode.addEventListener('click', onFilterNodeClick);

  defaultButtonNode.click();
};
