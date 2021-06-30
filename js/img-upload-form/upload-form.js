import {
  isEscape, hideNode, showNode, switchOnModalMode, switchOffModalMode, commonNodes
} from '../utils.js';
import { postData } from '../api.js';
import { initScale, destroyScale } from './scale.js';
import { initEffects, destroyEffects } from './effects.js';
import { initTextField, destroyTextField } from './text-fieldset.js';

const { uploadFormNode } = commonNodes;

const overlayNode = uploadFormNode.querySelector('.img-upload__overlay');
const uploadInputNode = uploadFormNode.querySelector('#upload-file');
const cancelBtnNode = uploadFormNode.querySelector('#upload-cancel');

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

const onUploadFormNodeSubmit = (evt) => {
  evt.preventDefault();

  postData(console.log, console.log, new FormData(evt.currentTarget));
};

function showForm() {
  showNode(overlayNode);
  switchOnModalMode();

  initScale();
  initEffects();
  initTextField();

  uploadInputNode.removeEventListener('change', onUploadInputNodeChange);
  uploadFormNode.addEventListener('submit', onUploadFormNodeSubmit);
  cancelBtnNode.addEventListener('click', onCancelBtnNodeClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

function hideForm() {
  hideNode(overlayNode);
  switchOffModalMode();

  uploadFormNode.reset();

  destroyScale();
  destroyEffects();
  destroyTextField();

  uploadInputNode.addEventListener('change', onUploadInputNodeChange);
  uploadFormNode.removeEventListener('submit', onUploadFormNodeSubmit);
  cancelBtnNode.removeEventListener('click', onCancelBtnNodeClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export const initUploadForm = () => {
  uploadInputNode.addEventListener('change', onUploadInputNodeChange);
};
