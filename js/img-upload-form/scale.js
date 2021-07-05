import { commonNodes } from '../utils.js';

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const { uploadFormNode, uploadImageNode } = commonNodes;

const scaleContainerNode = uploadFormNode.querySelector('.scale');
const scaleValueNode = scaleContainerNode.querySelector('.scale__control--value');
const scaleBiggerButtonNode = scaleContainerNode.querySelector('.scale__control--bigger');
const scaleSmallerButtonNode = scaleContainerNode.querySelector('.scale__control--smaller');

let currentScaleValue;

const setScale = (value) => {
  scaleValueNode.value = `${value}%`;
  uploadImageNode.style.transform = `scale(${(value / 100).toFixed(2)})`;
};

const onScaleSmallerButtonNodeClick = () => {
  currentScaleValue -= SCALE_STEP;
  if (currentScaleValue < MIN_SCALE_VALUE) {
    currentScaleValue = MIN_SCALE_VALUE;
  }

  setScale(currentScaleValue);
};

const onScaleBiggerButtonNodeClick = () => {
  currentScaleValue += SCALE_STEP;
  if (currentScaleValue > MAX_SCALE_VALUE) {
    currentScaleValue = MAX_SCALE_VALUE;
  }

  setScale(currentScaleValue);
};

export const initScale = () => {
  currentScaleValue = MAX_SCALE_VALUE;
  setScale(currentScaleValue);

  scaleBiggerButtonNode.addEventListener('click', onScaleBiggerButtonNodeClick);
  scaleSmallerButtonNode.addEventListener('click', onScaleSmallerButtonNodeClick);
};

export const destroyScale = () => {
  scaleBiggerButtonNode.removeEventListener('click', onScaleBiggerButtonNodeClick);
  scaleSmallerButtonNode.removeEventListener('click', onScaleSmallerButtonNodeClick);
};
