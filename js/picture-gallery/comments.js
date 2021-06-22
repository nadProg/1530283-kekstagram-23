import {showNode, hideNode} from '../utils.js';

const COMMENTS_STEP = 5;

const bigPictureNode = document.querySelector('.big-picture');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.comments-loader');

let currentComments = [];
let lastShownComment = 0;

hideNode(commentsLoaderNode);

const getCommentCountHTML = (lastShownItem, itemsAmount) => `
  ${lastShownItem} из <span class="comments-count">${itemsAmount}</span> комментариев
`;

const zeroComentCountHTML = getCommentCountHTML(0, 0);

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

const onCommentsLoaderNodeClick = () => {
  currentComments.slice(lastShownComment, lastShownComment + COMMENTS_STEP)
    .forEach((comment) => {
      socialCommentsNode.insertAdjacentHTML('beforeend', getCommentItemHTML(comment));
    });

  lastShownComment += COMMENTS_STEP;
  if (lastShownComment >= currentComments.length) {
    lastShownComment = currentComments.length;
    destroyCommentsLoader();
  }

  socialCommentCountNode.innerHTML = getCommentCountHTML(lastShownComment, currentComments.length);
};

function initCommentsLoader() {
  showNode(commentsLoaderNode);
  commentsLoaderNode.addEventListener('click', onCommentsLoaderNodeClick);
}

function destroyCommentsLoader() {
  hideNode(commentsLoaderNode);
  commentsLoaderNode.removeEventListener('click', onCommentsLoaderNodeClick);
}

export function initComments(comments) {
  lastShownComment = 0;
  currentComments = comments;
  socialCommentsNode.innerHTML = '';

  if (comments.length) {
    initCommentsLoader();
    commentsLoaderNode.click();
  } else {
    socialCommentCountNode.innerHTML = zeroComentCountHTML;
  }
}

export function destroyComments() {
  currentComments = [];
  destroyCommentsLoader();
}
