import { checkMaxLength, isUnique, isAlphaNumeric } from '../utils.js';

const HASHTAG_MAX_AMOUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 140;

const validateHashtag = (string) => {
  const hash = string[0];
  if (hash !== '#') {
    return 'Хэш-тег должен начинаться с символа #';
  }

  if (string.length > HASHTAG_MAX_LENGTH) {
    return `Максимальная длина одного хэш-тега - ${HASHTAG_MAX_LENGTH} символов`;
  }

  const text = string.slice(1);
  if (!text) {
    return 'Хэш-тег не может состоять только из одной решётки';
  }

  if (!isAlphaNumeric(text)) {
    return 'В тексте хэш-тега допускаются только буквы и числа';
  }

  return '';
};

export const validateHashtags = (string) => {
  const hashtags = string.toLowerCase().split(' ').filter((tag) => tag.length > 0);

  if (hashtags.length > HASHTAG_MAX_AMOUNT) {
    return `Максимальное число хэш-тегов - ${HASHTAG_MAX_AMOUNT}`;
  }

  if (!isUnique(hashtags)) {
    return 'Один и тот же хэш-тег не может быть использован дважды';
  }

  for (let i = 0; i < hashtags.length; i++) {
    const validate = validateHashtag(hashtags[i]);

    if (validate) {
      return validate;
    }
  }

  return '';
};

export const validateDescription = (text) => {
  if (checkMaxLength(text, DESCRIPTION_MAX_LENGTH)) {
    return '';
  }

  return `Длина комментария не должна превышать ${DESCRIPTION_MAX_LENGTH}. Текущая длина составляет ${text.length} символов.`;
};
