import { uploadFormNode } from '../common-nodes.js';
import { isEscape, isEnter, deleteTrailingSpaces } from '../utils.js';
import { validateHashtags, validateDescription } from './validation.js';

const textFieldsetNode = uploadFormNode.querySelector('.text');
const hashtagsInputNode = textFieldsetNode.querySelector('.text__hashtags');
const descriptionInputNode = textFieldsetNode.querySelector('.text__description');

const textInputNodes = [hashtagsInputNode, descriptionInputNode];

const onTextInputNodeKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.stopPropagation();
    return;
  }

  if (isEnter(evt)) {
    evt.preventDefault();
  }
};

const validateTextInputNode = (inputNode) => {
  let validate = () => '';
  if (inputNode.matches('.text__hashtags')) {
    validate = validateHashtags;
  } else if (inputNode.matches('.text__description')) {
    validate = validateDescription;
  }

  inputNode.setCustomValidity(validate(inputNode.value));

  inputNode.reportValidity();
};

const onTextInputNodeInput = ({ target }) => {
  validateTextInputNode(target);
};

const onTextInputNodeFocus = ({ target }) => {
  validateTextInputNode(target);
};

const onTextInputNodeChange = ({ target }) => {
  target.value = deleteTrailingSpaces(target.value);
  validateTextInputNode(target);
};


export const initTextField = () => {
  textInputNodes.forEach((textInputNode) => {
    textInputNode.addEventListener('input', onTextInputNodeInput);
    textInputNode.addEventListener('focus', onTextInputNodeFocus);
    textInputNode.addEventListener('change', onTextInputNodeChange);
    textInputNode.addEventListener('keydown', onTextInputNodeKeydown);
  });
};

export const destroyTextField = () => {
  textInputNodes.forEach((textInputNode) => {
    textInputNode.removeEventListener('input', onTextInputNodeInput);
    textInputNode.removeEventListener('focus', onTextInputNodeFocus);
    textInputNode.removeEventListener('change', onTextInputNodeChange);
    textInputNode.removeEventListener('keydown', onTextInputNodeKeydown);
    textInputNode.setCustomValidity('');
  });
};
