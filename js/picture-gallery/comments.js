import {showNode, hideNode} from '../utils.js';

const COMMENTS_STEP = 5;

const bigPictureNode = document.querySelector('.big-picture');
const socialCommentsNode = bigPictureNode.querySelector('.social__comments');
const socialCommentCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.comments-loader');

let currentComments = [];
let currentLastComment = 0;

const getCommentsCountHTML = (currentLast, total) => `${currentLast} из <span class="comments-count">${total}</span> комментариев`;

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

const onCommentsLoaderClick = () => {
  currentComments.slice(currentLastComment, currentLastComment + COMMENTS_STEP)
    .forEach((comment) => {
      socialCommentsNode.insertAdjacentHTML('beforeend', getCommentItemHTML(comment));
    });

  currentLastComment += COMMENTS_STEP;
  if (currentLastComment >= currentComments.length) {
    currentLastComment = currentComments.length;
    destroyCommentsLoader();
  }

  socialCommentCountNode.innerHTML = getCommentsCountHTML(currentLastComment, currentComments.length);
};

export const updateComments = (comments) => {
  currentComments = comments;
  currentLastComment = 0;
  socialCommentsNode.innerHTML = '';

  if (comments.length > 0) {
    initCommentsLoader();
    commentsLoaderNode.click();
  } else {
    socialCommentCountNode.innerHTML = getCommentsCountHTML(0, 0);
  }
};

export function initCommentsLoader() {
  showNode(commentsLoaderNode);
  commentsLoaderNode.addEventListener('click', onCommentsLoaderClick);
}

export function destroyCommentsLoader() {
  hideNode(commentsLoaderNode);
  commentsLoaderNode.removeEventListener('click', onCommentsLoaderClick);
}
