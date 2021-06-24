import {uploadFormNode, imageNode} from '../common-nodes.js';

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const scaleContainerNode = uploadFormNode.querySelector('.scale');
const scaleValueNode = scaleContainerNode.querySelector('.scale__control--value');
const scaleBiggerBtnNode = scaleContainerNode.querySelector('.scale__control--bigger');
const scaleSmallerBtnNode = scaleContainerNode.querySelector('.scale__control--smaller');

let currentScaleValue;

const setScale = (value) => {
  scaleValueNode.value = `${value}%`;
  imageNode.style.transform = `scale(${(value / 100).toFixed(2)})`;
};

const onScaleSmallerBtnNodeClick = () => {
  currentScaleValue -= SCALE_STEP;
  if (currentScaleValue < MIN_SCALE_VALUE) {
    currentScaleValue = MIN_SCALE_VALUE;
  }

  setScale(currentScaleValue);
};

const onScaleBiggerBtnNodeClick = () => {
  currentScaleValue += SCALE_STEP;
  if (currentScaleValue > MAX_SCALE_VALUE) {
    currentScaleValue = MAX_SCALE_VALUE;
  }

  setScale(currentScaleValue);
};

export const initScale = () => {
  currentScaleValue = MAX_SCALE_VALUE;
  setScale(currentScaleValue);

  scaleBiggerBtnNode.addEventListener('click', onScaleBiggerBtnNodeClick);
  scaleSmallerBtnNode.addEventListener('click', onScaleSmallerBtnNodeClick);
};

export const destroyScale = () => {
  scaleBiggerBtnNode.removeEventListener('click', onScaleBiggerBtnNodeClick);
  scaleSmallerBtnNode.removeEventListener('click', onScaleSmallerBtnNodeClick);
};
