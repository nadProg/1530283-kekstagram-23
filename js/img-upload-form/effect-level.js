import {hideNode, showNode} from '../utils.js';
import {uploadFormNode, imageNode} from '../common-nodes.js';

const effectNameToFilter = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    round: 0,
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const effectLevelContainerNode = uploadFormNode.querySelector('.effect-level');
const effectLevelInputNode = effectLevelContainerNode.querySelector('.effect-level__value');
const effectLevelSliderNode = effectLevelContainerNode.querySelector('.effect-level__slider');

hideNode(effectLevelContainerNode);

export const initEffectLevel = (effectName) => {
  const {min, max, step, name: filterName, unit = '', round = 1} = effectNameToFilter[effectName];

  const options = {
    range: {
      min,
      max,
    },
    step,
    start: max,
  };

  if (effectLevelSliderNode.noUiSlider) {
    effectLevelSliderNode.noUiSlider.off('update');
    effectLevelSliderNode.noUiSlider.updateOptions(options);
  } else {
    showNode(effectLevelContainerNode);
    noUiSlider.create(effectLevelSliderNode, options);
  }

  effectLevelSliderNode.noUiSlider.on('update', (_, handle, unencoded) => {
    const value = unencoded[handle].toFixed(round);
    effectLevelInputNode.value = value;
    imageNode.style.filter = `${filterName}(${value}${unit})`;
  });
};

export const destroyEffectLevel = () => {
  if (effectLevelSliderNode.noUiSlider) {
    effectLevelSliderNode.noUiSlider.destroy();
  }

  hideNode(effectLevelContainerNode);
  imageNode.style.filter = '';
  effectLevelInputNode.value = '';
};
