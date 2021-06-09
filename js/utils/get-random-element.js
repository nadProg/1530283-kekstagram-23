import {getRandomInteger} from './get-random-integer.js';

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
