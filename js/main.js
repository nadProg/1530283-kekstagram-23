/**
 * Возвращает случайное целое число в заданном диапазоне.
 * При передаче дробных значений границ диапазона учитывается только целая часть.
 * @param {number} min - Минимальное значение диапазона.
 * @param {number} max - Максимальное значение диапазона.
 * @returns {number} Результат всегда больше или равен минимальному значению диапазона.
 */
const getRandomInteger = (min, max) => {
  max = Math.trunc(max);
  min = Math.trunc(min);

  const range = max > min ? max - min + 1 : 1;

  return min + Math.floor(range * Math.random());
};

/**
 * Проверяет соответствие длины строки максимально допустимому значению.
 * @param {string} string - Проверяемая строка.
 * @param {number} maxLength - Максимально допустимое значение длины строки.
 * @returns {boolean} Возвращает true, если длина строки не превышает максимально допустимого значения. Возвращает false, в остальных случаях.
 */
const checkMaxLength = (string, maxLength) => string.length <= maxLength;

getRandomInteger(0, 10);
checkMaxLength('Hello World!', 140);


