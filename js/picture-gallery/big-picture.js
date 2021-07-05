import {
  isEscape, hideNode, showNode, switchOnModalMode, switchOffModalMode, commonNodes
} from '../utils.js';
import { initComments, destroyComments } from './comments.js';

const { picturesContainerNode, bigPictureContainerNode } = commonNodes;


const bigImageNode = bigPictureContainerNode.querySelector('.big-picture__img img');
const cancelButtonNode = bigPictureContainerNode.querySelector('.big-picture__cancel');
const likesCountNode = bigPictureContainerNode.querySelector('.likes-count');
const socialCaptionNode = bigPictureContainerNode.querySelector('.social__caption');

let renderedPictures = [];

const updateBigPicture = ({ url, likes, comments, description }) => {
  bigImageNode.src = url;
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
  hideNode(bigPictureContainerNode);
  switchOffModalMode();

  destroyComments();

  picturesContainerNode.addEventListener('click', onPicturesContainerNodeClick);
  cancelButtonNode.removeEventListener('click', onCancelButtonNodeClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export function showBigPicture(picture) {
  showNode(bigPictureContainerNode);
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
