import {renderNodes} from '../utils.js';

const pictureTemplateNode = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPictureNode = ({url, likes, comments}) => {
  const pictureNode = pictureTemplateNode.cloneNode(true);

  pictureNode.querySelector('.picture__img').src = url;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;

  return pictureNode;
};

const picturesContainerNode = document.querySelector('.pictures');

export const renderPictures = (pictures) => {
  const pictureNodes = pictures.map(createPictureNode);
  renderNodes(pictureNodes, picturesContainerNode);
};
