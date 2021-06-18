import {renderNodes} from '../utils.js';

let renderedPictures = [];

const pictureTemplateNode = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesContainerNode = document.querySelector('.pictures');

const createPictureNode = ({id, url, likes, comments}) => {
  const pictureNode = pictureTemplateNode.cloneNode(true);

  pictureNode.dataset.id = id;
  pictureNode.querySelector('.picture__img').src = url;
  pictureNode.querySelector('.picture__likes').textContent = likes;
  pictureNode.querySelector('.picture__comments').textContent = comments.length;

  return pictureNode;
};

export const renderPictures = (pictures) => {
  renderedPictures = pictures;
  renderNodes(pictures.map(createPictureNode), picturesContainerNode);
};

export const setPicturesContainerClickHandler = (cb) => {
  picturesContainerNode.addEventListener('click', (evt) => {
    const pictureNode = evt.target.closest('.picture');

    if (pictureNode && evt.currentTarget.contains(pictureNode)) {
      evt.preventDefault();

      const {id} = pictureNode.dataset;
      const picture = renderedPictures.find((item) => item.id === Number(id));

      if (picture) {
        cb(picture);
      }
    }
  });
};


