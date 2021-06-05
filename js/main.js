const PHOTOS_AMOUNT = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const DESCRIPTIONS = new Array(10).fill('Описание - ').map((item, index) => item + ++index);

const MIN_COMMENT_ID = 10;
const MAX_COMMENT_ID = 20;
const MAX_COMMENTS_AMOUNT = 5;

const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

const MESSAGE_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.',
];

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

/**
 * Вовзращает случайного значение из переданного массива значений.
 * @param {Array} array - Массив значений.
 * @returns {any} Случайное значение из переданного массива.
 */
const getRandomElement = (array) => {
  const min = 0;
  const max = array.length - 1;
  const randomIndex = getRandomInteger(min, max);

  return array[randomIndex];
};

const getUrl = (id) => `photos/${id}.jpg`;

const getDescription = () => getRandomElement(DESCRIPTIONS);

const getLikes = () => getRandomInteger(MIN_LIKES, MAX_LIKES);

// Временно создает пустой массив комментариев.
const getComments = () => [];

const photoIds = getShuffledIntegerSequence(1, PHOTOS_AMOUNT);

const createPhoto = (id) => ({
  id,
  url: getUrl(id),
  description: getDescription(),
  likes: getLikes(),
  comments: getComments(),
});

const photos = photoIds.map(createPhoto);

console.log(photos);

const getAvatar = () => `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`;

const getMessage = () => {
  const MAX_INDEX = MESSAGE_SENTENCES.length - 1;
  const firstIndex = getRandomInteger(0, MAX_INDEX);

  const isOneSentenceMessage = !!Math.round(Math.random());
  if (isOneSentenceMessage) {
    return MESSAGE_SENTENCES[firstIndex];
  }

  let secondIndex;
  while (!secondIndex) {
    const index = getRandomInteger(0, MAX_INDEX);
    if (index === firstIndex) {
      continue;
    } else {
      secondIndex = index;
    }
  }

  const message = [firstIndex, secondIndex].map((index) => MESSAGE_SENTENCES[index]).join(' ');

  return message;
};

console.log(getMessage());
console.log(getMessage());
console.log(getMessage());
console.log(getMessage());
console.log(getMessage());

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
