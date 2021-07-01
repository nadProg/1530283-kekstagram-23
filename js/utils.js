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
 * Возвращает случайное целое число в заданном диапазоне.
 * При передаче дробных значений границ диапазона учитывается только целая часть.
 * @param {number} min - Минимальное значение диапазона.
 * @param {number} max - Максимальное значение диапазона.
 * @returns {number} Результат всегда больше или равен минимальному значению диапазона.
 */
export const getRandomInteger = (min, max) => {
  max = Math.trunc(max);
  min = Math.trunc(min);

  const range = max > min ? max - min + 1 : 1;

  return min + Math.floor(range * Math.random());
};

/**
 * Вовзращает случайного значение из переданного массива значений.
 * @param {Array} array - Массив значений.
 * @returns {any} Случайное значение из переданного массива.
 */
export const getRandomElement = (array) => {
  const min = 0;
  const max = array.length - 1;

  return array[getRandomInteger(min, max)];
};

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

/**
 * Возвращает упорядоченный массив целых чисел из заданного диапазона.
 * При передаче дробных значений границ диапазона учитывается только целая часть.
 * @param {number} min - Минимальное значение диапазона.
 * @param {number} max - Максимальное значение диапазона.
 * @returns {Array} Массив состоит как минимум из одного элемента равного минимальному значению диапазона.
 */
export const getIntegerSequence = (min, max) => {
  max = Math.trunc(max);
  min = Math.trunc(min);

  const range = max > min ? max - min + 1 : 1;

  return new Array(range).fill(min).map((item, index) => item + index);
};

export const getShuffledIntegerSequence = (min, max) => shuffle(getIntegerSequence(min, max));

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
