import { commonNodes } from '../utils.js';
import { initEffectLevel, destroyEffectLevel } from './effect-level.js';

const INITIAL_EFFECT = 'none';

const { uploadFormNode, uploadImageNode } = commonNodes;

const effectsContainerNode = uploadFormNode.querySelector('.effects__list');

let currentEffect;

const onEffectsContainerNodeChange = (evt) => {
  const effectRadioNode = evt.target;

  if (effectRadioNode.matches('.effects__radio')) {
    uploadImageNode.classList.remove(`effects__preview--${currentEffect}`);
    currentEffect = effectRadioNode.value;
    uploadImageNode.classList.add(`effects__preview--${currentEffect}`);

    if (currentEffect === INITIAL_EFFECT) {
      destroyEffectLevel();
    } else {
      initEffectLevel(currentEffect);
    }
  }
};

export const initEffects = () => {
  currentEffect = INITIAL_EFFECT;
  uploadImageNode.classList.add(`effects__preview--${currentEffect}`);
  effectsContainerNode.addEventListener('change', onEffectsContainerNodeChange);
};

export const destroyEffects = () => {
  destroyEffectLevel();
  uploadImageNode.classList.remove(`effects__preview--${currentEffect}`);
  effectsContainerNode.removeEventListener('change', onEffectsContainerNodeChange);
};
