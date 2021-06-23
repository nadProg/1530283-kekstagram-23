import {hideNode, showNode} from '../utils.js';
import {initEffectLevel, updateEffectLevel, destroyEffectLevel} from './effect-level.js';

const INITIAL_EFFECT = 'none';

const uploadFormNode = document.querySelector('.img-upload__form');
const imageNode = uploadFormNode.querySelector('.img-upload__preview img');
const effectsContainerNode = uploadFormNode.querySelector('.effects__list');
const effectLevelContainerNode = uploadFormNode.querySelector('.effect-level');

let currentEffect = INITIAL_EFFECT;

const onEffectsContainerNodeChange = (evt) => {
  const effectRadioNode = evt.target;

  if (effectRadioNode.matches('.effects__radio')) {
    imageNode.classList.remove(`effects__preview--${currentEffect}`);
    currentEffect = effectRadioNode.value;
    imageNode.classList.add(`effects__preview--${currentEffect}`);

    if (currentEffect === INITIAL_EFFECT) {
      hideNode(effectLevelContainerNode);
    } else {
      showNode(effectLevelContainerNode);
    }
  }
};


export const initEffects = () => {
  currentEffect = INITIAL_EFFECT;
  hideNode(effectLevelContainerNode);

  effectsContainerNode.addEventListener('change', onEffectsContainerNodeChange);

  // initEffectLevel();
};

export const destroyEffects = () => {
  effectsContainerNode.removeEventListener('change', onEffectsContainerNodeChange);

  // destroyEffectLevel();
};
