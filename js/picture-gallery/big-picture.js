import {
  isEscape, hideNode, showNode, switchOnModalMode, switchOffModalMode, commonNodes
} from '../utils.js';
import { initComments, destroyComments } from './comments.js';

const { picturesContainerNode } = commonNodes;

const bigPictureNode = document.querySelector('.big-picture');
const imageNode = bigPictureNode.querySelector('.big-picture__img img');
const cancelButtonNode = bigPictureNode.querySelector('.big-picture__cancel');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const socialCaptionNode = bigPictureNode.querySelector('.social__caption');

let renderedPictures = [];

const updateBigPicture = ({ url, likes, comments, description }) => {
  imageNode.src = url;
  likesCountNode.textContent = likes;
  socialCaptionNode.textContent = description;
  initComments(comments);
};

const onCancelButtonNodeClick = () => {
  hideBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
};

const onPicturesContainerNodeClick = (evt) => {
  const pictureNode = evt.target.closest('.picture');

  if (pictureNode && evt.currentTarget.contains(pictureNode)) {
    evt.preventDefault();

    const { id } = pictureNode.dataset;
    const picture = renderedPictures.find((item) => item.id === Number(id));

    if (picture) {
      showBigPicture(picture);
    }
  }
};

function hideBigPicture() {
  hideNode(bigPictureNode);
  switchOffModalMode();

  destroyComments();

  picturesContainerNode.addEventListener('click', onPicturesContainerNodeClick);
  cancelButtonNode.removeEventListener('click', onCancelButtonNodeClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export function showBigPicture(picture) {
  showNode(bigPictureNode);
  switchOnModalMode();

  updateBigPicture(picture);

  picturesContainerNode.removeEventListener('click', onPicturesContainerNodeClick);
  cancelButtonNode.addEventListener('click', onCancelButtonNodeClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

export const setRenderedPictures = (pictures) => renderedPictures = pictures;

export const initBigPicture = () => {
  picturesContainerNode.addEventListener('click', onPicturesContainerNodeClick);
};
