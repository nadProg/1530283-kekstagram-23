import {
  isEscape, hideNode, showNode, switchOnModalMode, switchOffModalMode, commonNodes
} from '../utils.js';
import { postData } from '../api.js';
import { showModalMessage } from '../modal-message.js';
import { initScale, destroyScale } from './scale.js';
import { initEffects, destroyEffects } from './effects.js';
import { initTextField, destroyTextField } from './text-fieldset.js';

const { uploadFormNode } = commonNodes;

const overlayNode = uploadFormNode.querySelector('.img-upload__overlay');
const uploadInputNode = uploadFormNode.querySelector('#upload-file');
const cancelButtonNode = uploadFormNode.querySelector('#upload-cancel');
const submitButtonNode = uploadFormNode.querySelector('#upload-submit');

const onUploadInputNodeChange = () => {
  showForm();
};

const onCancelButtonNodeClick = () => {
  hideForm();
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    hideForm();
  }
};

const onPostDataSuccess = () => {
  hideForm();
  showModalMessage('success');
};

const onPostDataError = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  showModalMessage('error', () => document.addEventListener('keydown', onDocumentKeydown));
};

const onPostDataFinally = () => submitButtonNode.disabled = false;

const onUploadFormNodeSubmit = (evt) => {
  evt.preventDefault();

  submitButtonNode.disabled = true;
  const body = new FormData(evt.currentTarget);
  postData(onPostDataSuccess, onPostDataError, onPostDataFinally, body);
};

function showForm() {
  showNode(overlayNode);
  switchOnModalMode();

  initScale();
  initEffects();
  initTextField();

  uploadInputNode.removeEventListener('change', onUploadInputNodeChange);
  uploadFormNode.addEventListener('submit', onUploadFormNodeSubmit);
  cancelButtonNode.addEventListener('click', onCancelButtonNodeClick);
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
  cancelButtonNode.removeEventListener('click', onCancelButtonNodeClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export const initUploadForm = () => {
  uploadInputNode.addEventListener('change', onUploadInputNodeChange);
};
