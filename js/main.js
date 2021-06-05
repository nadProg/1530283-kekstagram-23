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

/**
 * Возвращает упорядоченный массив целых чисел из заданного диапазона.
 * При передаче дробных значений границ диапазона учитывается только целая часть.
 * @param {number} min - Минимальное значение диапазона.
 * @param {number} max - Максимальное значение диапазона.
 * @returns {Array} Массив состоит как минимум из одного элемента равного минимальному значению диапазона.
 */
const getIntegerSequence = (min, max) => {
  max = Math.trunc(max);
  min = Math.trunc(min);

  const range = max > min ? max - min + 1 : 1;

  const sequence = new Array(range).fill(min).map((item, index) => item + index);
  return sequence;
};

/**
 * Перемешивает элементы массива случайным образом.
 * Использует алгоритм тасования Фишера-Йетса (источник: https://learn.javascript.ru/task/shuffle)
 * @param {Array} array - Исходный массив.
 * @returns {Array} Вовзращает перемешанную неглубокую копию исходного массива.
 */
const shuffle = (array) => {
  array = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const getShuffledIntegerSequence = (min, max) => shuffle(getIntegerSequence(min, max));

console.log(getIntegerSequence(1, 25));
console.log(getIntegerSequence(5, 10));
console.log(getIntegerSequence(18, 20));
console.log(getIntegerSequence(-5, 5));
console.log(getIntegerSequence(7.5, 12.9));
console.log(getIntegerSequence(7.5, 7.9));
console.log(getIntegerSequence(7.5, -7.9));

console.log(getShuffledIntegerSequence(1, 25));
console.log(getShuffledIntegerSequence(5, 10));
console.log(getShuffledIntegerSequence(18, 20));
console.log(getShuffledIntegerSequence(-5, 5));
console.log(getShuffledIntegerSequence(7.5, 12.9));
console.log(getShuffledIntegerSequence(7.5, 7.9));
console.log(getShuffledIntegerSequence(7.5, -7.9));

// const objectTemplate = {
//   id: {
//     type: Number,
//     min: 1,
//     max: 25,
//     unique: true,
//   },
//   url: {
//     type: String,
//     unique: true,
//     template: 'photos/{{i}}.jpg',
//   },
//   description: String,
//   likes: {
//     type: String,
//     min: 15,
//     max: 200,
//   },
//   comments: Array<Comment>,
// };

// const commentTemplate = {
//   id: {
//     type: String,
//     unique: true,
//   },
//   avatar: {
//     type: String,
//     template: 'img/avatar-{{случайное число от 1 до 6}}.svg',
//   },
//   message: String,
//   name: String,
// };

// В файле main.js на основе написанных по заданию ранее вспомогательных функций напишите необходимые функции для создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.

// Структура каждого объекта должна быть следующей:

// id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.

// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

// description, строка — описание фотографии. Описание придумайте самостоятельно.

// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.

// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

// {
//   id: 135,
//   avatar: 'img/avatar-6.svg',
//   message: 'В целом всё неплохо. Но не всё.',
//   name: 'Артём',
// }
// У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.

// Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:

// Всё отлично!
// В целом всё неплохо. Но не всё.
// Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
// Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
// Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
// Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
// Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
