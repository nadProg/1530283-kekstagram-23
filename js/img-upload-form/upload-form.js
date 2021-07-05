import {
  isEscape, hideNode, showNode, switchOnModalMode, switchOffModalMode, commonNodes
} from '../utils.js';
import { loadPreview } from './load-preview.js';
import { showModalMessage } from '../modal-message.js';
import { postData } from '../api.js';
import { initScale, destroyScale } from './scale.js';
import { initEffects, destroyEffects } from './effects.js';
import { initTextFieldset, destroyTextFieldset } from './text-fieldset.js';

const { uploadFormNode } = commonNodes;

const overlayNode = uploadFormNode.querySelector('.img-upload__overlay');
const uploadInputNode = uploadFormNode.querySelector('#upload-file');
const cancelButtonNode = uploadFormNode.querySelector('#upload-cancel');
const submitButtonNode = uploadFormNode.querySelector('#upload-submit');

const onUploadInputNodeChange = async ({ currentTarget }) => {
  try {
    const file = currentTarget.files[0];
    await loadPreview(file);
    showForm();
  } catch (error) {
    currentTarget.value = '';
    showModalMessage('error');
  }
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

const onUploadFormNodeSubmit = async (evt) => {
  evt.preventDefault();

  submitButtonNode.disabled = true;
  const body = new FormData(evt.currentTarget);
  await postData(onPostDataSuccess, onPostDataError, body);
  submitButtonNode.disabled = false;
};

function showForm() {
  showNode(overlayNode);
  switchOnModalMode();

  initScale();
  initEffects();
  initTextFieldset();

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
  destroyTextFieldset();

  uploadInputNode.addEventListener('change', onUploadInputNodeChange);
  uploadFormNode.removeEventListener('submit', onUploadFormNodeSubmit);
  cancelButtonNode.removeEventListener('click', onCancelButtonNodeClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export const initUploadForm = () => {
  uploadInputNode.addEventListener('change', onUploadInputNodeChange);
};
