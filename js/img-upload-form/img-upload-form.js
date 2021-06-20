import {
  isEscape, hideNode, showNode, switchOnModalMode, switchOffModalMode
} from '../utils.js';
import {initTextField, destroyTextField} from './text-field.js';

const formNode = document.querySelector('.img-upload__form');
const overlayNode = formNode.querySelector('.img-upload__overlay');
const uploadInputNode = formNode.querySelector('.img-upload__input');
const cancelBtnNode = formNode.querySelector('.img-upload__cancel');

const onUploadInputNodeChange = () => {
  showForm();
};

const onCancelBtnNodeClick = () => {
  hideForm();
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    hideForm();
  }
};

function showForm() {
  showNode(overlayNode);
  switchOnModalMode();

  initTextField();

  uploadInputNode.removeEventListener('change', onUploadInputNodeChange);
  cancelBtnNode.addEventListener('click', onCancelBtnNodeClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

function hideForm() {
  hideNode(overlayNode);
  switchOffModalMode();

  formNode.reset();
  destroyTextField();

  uploadInputNode.addEventListener('change', onUploadInputNodeChange);
  cancelBtnNode.removeEventListener('click', onCancelBtnNodeClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export const initForm = () => {
  uploadInputNode.addEventListener('change', onUploadInputNodeChange);
};
