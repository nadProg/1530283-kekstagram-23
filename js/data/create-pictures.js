import {getRandomInteger, getRandomElement, getShuffledIntegerSequence} from '../utils.js';
import {createComments} from './create-comments.js';

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

const getUrl = (id) => `photos/${id}.jpg`;

const getDescription = () => getRandomElement(DESCRIPTIONS);

const getLikes = () => getRandomInteger(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT);

const createPicture = (id) => ({
  id,
  url: getUrl(id),
  description: getDescription(),
  likes: getLikes(),
  comments: createComments(),
});

export const createPictures = () => getShuffledIntegerSequence(MIN_PHOTO_ID, MAX_PHOTO_ID).map(createPicture);
