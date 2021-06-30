import { isEscape, isFunction } from './utils.js';

const Template = {
  ERROR: document.querySelector('#error').content.querySelector('.error'),
  SUCCESS: document.querySelector('#success').content.querySelector('.success'),
};

let currentMessage = null;
let afterHideCallback = null;

const onMessageInnerNodeClick = (evt) => {
  evt.stopPropagation();
};

const onButtonNodeClick = () => {
  hideModalMessage();
};

const onDocumentClick = () => {
  hideModalMessage();
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    hideModalMessage();
  }
};

const createMessage = (type) => {
  const messageNode = Template[type.toUpperCase()].cloneNode(true);
  const buttonNode = messageNode.querySelector(`.${type.toLowerCase()}__button`);
  const messageInnerNode = messageNode.querySelector(`.${type.toLowerCase()}__inner`);

  buttonNode.addEventListener('click', onButtonNodeClick);
  messageInnerNode.addEventListener('click', onMessageInnerNodeClick);

  return messageNode;
};

function hideModalMessage() {
  if (currentMessage) {
    currentMessage.remove();
    currentMessage = null;

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);

    if (isFunction(afterHideCallback)) {
      afterHideCallback();
      afterHideCallback = null;
    }
  }
}

export function showModalMessage(type, cb) {
  if (currentMessage) {
    hideModalMessage();
  }

  afterHideCallback = cb;
  currentMessage = createMessage(type);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.appendChild(currentMessage);
}

