import { isEscape, isEnter, deleteTrailingSpaces, commonNodes } from '../utils.js';
import { validateHashtags, validateDescription } from './validation.js';

const { uploadFormNode } = commonNodes;

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
  const validate = inputNode.matches('.text__hashtags') ? validateHashtags : validateDescription;

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


export const initTextFieldset = () => {
  textInputNodes.forEach((textInputNode) => {
    textInputNode.addEventListener('input', onTextInputNodeInput);
    textInputNode.addEventListener('focus', onTextInputNodeFocus);
    textInputNode.addEventListener('change', onTextInputNodeChange);
    textInputNode.addEventListener('keydown', onTextInputNodeKeydown);
  });
};

export const destroyTextFieldset = () => {
  textInputNodes.forEach((textInputNode) => {
    textInputNode.removeEventListener('input', onTextInputNodeInput);
    textInputNode.removeEventListener('focus', onTextInputNodeFocus);
    textInputNode.removeEventListener('change', onTextInputNodeChange);
    textInputNode.removeEventListener('keydown', onTextInputNodeKeydown);
    textInputNode.setCustomValidity('');
  });
};
