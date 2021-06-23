import {initEffectLevel, destroyEffectLevel} from './effect-level.js';

const INITIAL_EFFECT = 'none';

const uploadFormNode = document.querySelector('.img-upload__form');
const imageNode = uploadFormNode.querySelector('.img-upload__preview img');
const effectsContainerNode = uploadFormNode.querySelector('.effects__list');

let currentEffect = INITIAL_EFFECT;

const onEffectsContainerNodeChange = (evt) => {
  const effectRadioNode = evt.target;

  if (effectRadioNode.matches('.effects__radio')) {
    imageNode.classList.remove(`effects__preview--${currentEffect}`);
    currentEffect = effectRadioNode.value;
    imageNode.classList.add(`effects__preview--${currentEffect}`);

    if (currentEffect === INITIAL_EFFECT) {
      destroyEffectLevel();
    } else {
      initEffectLevel(currentEffect);
    }
  }
};

export const initEffects = () => {
  currentEffect = INITIAL_EFFECT;
  imageNode.classList.add(`effects__preview--${currentEffect}`);
  effectsContainerNode.addEventListener('change', onEffectsContainerNodeChange);
};

export const destroyEffects = () => {
  destroyEffectLevel();
  imageNode.classList.remove(`effects__preview--${currentEffect}`);
  effectsContainerNode.removeEventListener('change', onEffectsContainerNodeChange);
};
