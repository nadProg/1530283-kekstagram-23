import {hideNode, showNode} from '../utils.js';

const INITIAL_EFFECT = 'none';

const effectNameToFilter = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
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
    unit: '',
  },
};

const uploadFormNode = document.querySelector('.img-upload__form');
const imageNode = uploadFormNode.querySelector('.img-upload__preview img');
const effectsContainerNode = uploadFormNode.querySelector('.effects__list');
const effectLevelContainerNode = uploadFormNode.querySelector('.effect-level');
const effectLevelInputNode = effectLevelContainerNode.querySelector('.effect-level__value');
// const effectLevelSliderNode = effectLevelContainerNode.querySelector('.effect-level__slider');

let currentEffect = INITIAL_EFFECT;

const getFilter = (effectName) => {
  const filter = effectNameToFilter[effectName];
  if (!filter) {
    return INITIAL_EFFECT;
  }

  const {name, max, unit} = filter;
  return `${name}(${max}${unit})`;
};

const onEffectsContainerNodeChange = (evt) => {
  const effectRadioNode = evt.target;

  if (effectRadioNode.matches('.effects__radio')) {
    currentEffect = effectRadioNode.value;

    imageNode.style.filter = getFilter(currentEffect);

    if (currentEffect === INITIAL_EFFECT) {
      hideNode(effectLevelContainerNode);
      effectLevelInputNode.value = '';
    } else {
      showNode(effectLevelContainerNode);
      effectLevelInputNode.value = effectNameToFilter[currentEffect].max;
    }
  }
};

export const initEffects = () => {
  currentEffect = INITIAL_EFFECT;
  hideNode(effectLevelContainerNode);
  imageNode.style.filter = getFilter(currentEffect);
  effectsContainerNode.addEventListener('change', onEffectsContainerNodeChange);
};

export const destroyEffects = () => {
  effectsContainerNode.removeEventListener('change', onEffectsContainerNodeChange);
};
