const HIDDEN_CLASS = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';
const bodyNode = document.body;
const TRAILING_SPACE = /[ ]+/g;
const ALPHANUMERIC = /^[а-яёa-z0-9]+$/;

/**
 * Проверяет соответствие длины строки максимально допустимому значению.
 * @param {string} string - Проверяемая строка.
 * @param {number} maxLength - Максимально допустимое значение длины строки.
 * @returns {boolean} Возвращает true, если длина строки не превышает максимально допустимого значения. Возвращает false, в остальных случаях.
 */
export const checkMaxLength = (string, maxLength) => string.length <= maxLength;

/**
 * Перемешивает элементы массива случайным образом.
 * Использует алгоритм тасования Фишера-Йетса (источник: https://learn.javascript.ru/task/shuffle)
 * @param {Array} array - Исходный массив.
 * @returns {Array} Вовзращает перемешанную неглубокую копию исходного массива.
 */
export const shuffle = (array) => {
  array = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const renderNodes = (nodes, container) => {
  const fragment = document.createDocumentFragment();
  nodes.forEach((node) => fragment.appendChild(node));
  container.appendChild(fragment);
};

export const hideNode = (node) => {
  node.classList.add(HIDDEN_CLASS);
};

export const showNode = (node) => {
  node.classList.remove(HIDDEN_CLASS);
};

export const switchOnModalMode = () => bodyNode.classList.add(MODAL_OPEN_CLASS);

export const switchOffModalMode = () => bodyNode.classList.remove(MODAL_OPEN_CLASS);

export const isEscape = ({code}) => code === 'Escape';

export const isEnter = ({code}) => code === 'Enter';

export const isFunction = (func) => typeof func === 'function';

export const isUnique = (array) => array.length === [...new Set(array)].length;

export const deleteTrailingSpaces = (string) => string.trim().replace(TRAILING_SPACE, ' ');

export const isAlphaNumeric = (string) => ALPHANUMERIC.test(string.toLowerCase());

const picturesContainerNode = bodyNode.querySelector('.pictures');

const uploadFormNode = picturesContainerNode.querySelector('.img-upload__form');

const imageNode = uploadFormNode.querySelector('.img-upload__preview img');

export const commonNodes = {
  imageNode,
  uploadFormNode,
  picturesContainerNode,
};

export const debounce = (cb, time = 500) => {
  let timeoutId;

  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, arguments), time);
  };
};

export const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
