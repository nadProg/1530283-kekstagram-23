import { renderNodes, commonNodes} from '../utils.js';

const { picturesContainerNode } = commonNodes;

const pictureTemplateNode = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPictureNode = ({ id, url, likes, comments }) => {
  const pictureNode = pictureTemplateNode.cloneNode(true);

  pictureNode.dataset.id = id;
  pictureNode.querySelector('.picture__img').src = url;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;

  return pictureNode;
};

const clearContainer = () => {
  const renderedPictures = picturesContainerNode.querySelectorAll('.picture');

  renderedPictures.forEach((picture) => picture.remove());
};

export const renderPictures = (pictures) => {
  clearContainer();
  renderNodes(pictures.map(createPictureNode), picturesContainerNode);
};
