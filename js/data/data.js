import {getRandomInteger} from '/js/utils/get-random-integer.js';
import {getRandomElement} from '/js/utils/get-random-element.js';
import {getShuffledIntegerSequence} from '/js/utils/get-shuffled-integer-sequence.js';

const MIN_PHOTO_ID = 1;
const MAX_PHOTO_ID = 25;

const MIN_LIKES_AMOUNT = 15;
const MAX_LIKES_AMOUNT = 200;

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

const MIN_COMMENTS_AMOUNT = 0;
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
];

const USER_NAMES = [
  'Вася', 'Петя', 'Маша', 'Оля', 'Женя', 'Юра',
];

const getUrl = (id) => `photos/${id}.jpg`;

const getDescription = () => getRandomElement(DESCRIPTIONS);

const getLikes = () => getRandomInteger(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT);

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

const getMessage = () => {
  const min = 0;
  const max = MESSAGE_SENTENCES.length - 1;
  const getRandomIndex = () => getRandomInteger(min, max);

  const firstIndex = getRandomIndex();

  const isOneSentenceMessage = !!Math.round(Math.random());
  if (isOneSentenceMessage) {
    return MESSAGE_SENTENCES[firstIndex];
  }

  let secondIndex;
  while (!secondIndex) {
    const index = getRandomIndex();
    if (index === firstIndex) {
      continue;
    } else {
      secondIndex = index;
    }
  }

  return [firstIndex, secondIndex].map((index) => MESSAGE_SENTENCES[index]).join(' ');
};

const getAvatar = (id) => `img/avatar-${id}.svg`;

const getUserName = (id) => USER_NAMES[id - 1];

const getUserData = () => {
  const id = getRandomInteger(MIN_USER_ID, MAX_USER_ID);
  return {
    avatar: getAvatar(id),
    name: getUserName(id),
  };
};

const createComment = () => ({
  id: getCommentId(),
  message: getMessage(),
  ...getUserData(),
});

const createComments = () => {
  const commentsAmount = getRandomInteger(MIN_COMMENTS_AMOUNT, MAX_COMMENTS_AMOUNT);

  return new Array(commentsAmount).fill().map(createComment);
};

const createPhoto = (id) => ({
  id,
  url: getUrl(id),
  description: getDescription(),
  likes: getLikes(),
  comments: createComments(),
});

const createPhotos = () => getShuffledIntegerSequence(MIN_PHOTO_ID, MAX_PHOTO_ID).map(createPhoto);

console.log(createPhotos());
