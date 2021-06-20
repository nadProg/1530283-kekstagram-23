import {
  isEscape, hideNode, showNode, switchOnModalMode, switchOffModalMode
} from '../utils.js';

const picturesContainerNode = document.querySelector('.pictures');
const bigPictureNode = document.querySelector('.big-picture');
const imageNode = bigPictureNode.querySelector('.big-picture__img img');
const cancelBtnNode = bigPictureNode.querySelector('.big-picture__cancel');
const likesCountNode = bigPictureNode.querySelector('.likes-count');
const socialCaptionNode = bigPictureNode.querySelector('.social__caption');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.comments-loader');

let renderedPictures = [];

hideNode(commentsLoaderNode);
hideNode(socialCommentCountNode);

const getCommentsCountHTML = (total) => `${total} из <span class="comments-count">${total}</span> комментариев`;

const getCommentItemHTML = ({avatar, name, message}) => `
  <li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;

const updateBigPicture = ({url, likes, comments, description}) => {
  imageNode.src = url;
  likesCountNode.textContent = likes;
  socialCaptionNode.textContent = description;
  socialCommentCountNode.innerHTML = getCommentsCountHTML(comments.length);
  socialCommentsNode.innerHTML = comments.map(getCommentItemHTML).reduce((html, li) => html + li, '');
};

const onCancelBtnNodeClick = () => {
  hideBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    hideBigPicture();
  }
};

const onPicturesContainerNodeClick = (evt) => {
  const pictureNode = evt.target.closest('.picture');

  if (pictureNode && evt.currentTarget.contains(pictureNode)) {
    evt.preventDefault();

    const {id} = pictureNode.dataset;
    const picture = renderedPictures.find((item) => item.id === Number(id));

    if (picture) {
      showBigPicture(picture);
    }
  }
};

function hideBigPicture() {
  hideNode(bigPictureNode);
  switchOffModalMode();

  picturesContainerNode.addEventListener('click', onPicturesContainerNodeClick);
  cancelBtnNode.removeEventListener('click', onCancelBtnNodeClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

export function showBigPicture(picture) {
  showNode(bigPictureNode);
  switchOnModalMode();

  updateBigPicture(picture);

  picturesContainerNode.removeEventListener('click', onPicturesContainerNodeClick);
  cancelBtnNode.addEventListener('click', onCancelBtnNodeClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

export const setRenderedPictures = (pictures) => renderedPictures = pictures;

export const initBigPicture = () => {
  picturesContainerNode.addEventListener('click', onPicturesContainerNodeClick);
};
