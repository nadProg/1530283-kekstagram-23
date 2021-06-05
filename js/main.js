const PHOTOS_AMOUNT = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const DESCRIPTIONS = [
  'Пляжный сезон 2021',
  'Новая коллекция обуви Gucci',
  'Новое поступление в IKEA',
  'Японская кухня в ресторане Rыба',
  'Испанская кухня в ресторане La Perla Seafood Bar',
  'Автомобили премиум-класса',
  'Концерт классической музыки',
  'Рок-фестиваль "Нашествие"',
];

const MAX_COMMENTS_AMOUNT = 5;

const MIN_COMMENT_ID = 100;
const MAX_COMMENT_ID = 999;

const MIN_USER_ID = 1;
const MAX_USER_ID = 6;

const MESSAGE_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.',
];

const USER_NAMES = [
  'Вася', 'Петя', 'Маша', 'Оля', 'Женя', 'Юра',
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

const getAvatar = (id) => `img/avatar-${id}.svg`;

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

const getCommentId = (() => {
  const ids = [];

  return () => {
    let id;

    do {
      id = getRandomInteger(MIN_COMMENT_ID, MAX_COMMENT_ID);
    } while (ids.includes(id));


    ids.push(id);

    return id;
  };
})();

const createComment = () => {
  const userId = getRandomInteger(MIN_USER_ID, MAX_USER_ID);

  return {
    id: getCommentId(),
    url: getAvatar(userId),
    message: getMessage(),
    likes: getLikes(),
    name: USER_NAMES[userId - 1],
  };
};

const getComments = () => {
  const commentsAmount = getRandomInteger(0, MAX_COMMENTS_AMOUNT);

  const comments = new Array(commentsAmount).fill().map(createComment);

  return comments;
};

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
