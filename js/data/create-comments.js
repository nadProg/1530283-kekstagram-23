import {getRandomInteger} from '../utils.js';

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

export const createComments = () => {
  const commentsAmount = getRandomInteger(MIN_COMMENTS_AMOUNT, MAX_COMMENTS_AMOUNT);

  return new Array(commentsAmount).fill().map(createComment);
};
