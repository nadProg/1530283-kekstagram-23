const effectLevelContainerNode = document.querySelector('.effect-level');
const effectLevelInputNode = effectLevelContainerNode.querySelector('.effect-level__value');
const effectLevelSliderNode = effectLevelContainerNode.querySelector('.effect-level__slider');

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

const getFilter = (effectName) => {
  const filter = effectNameToFilter[effectName];
  if (!filter) {
    return INITIAL_EFFECT;
  }

  const {name, max, unit} = filter;
  return `${name}(${max}${unit})`;
};

export const initEffectLevel = ({min, max, step}) => {
  noUiSlider.create(effectLevelSliderNode, {
    range: {
      min,
      max,
    },
    step,
    start: max,
  });
};

export const updateEffectLevel = ({min, max, step}) => {
  if (effectLevelSliderNode.noUiSlider) {
    effectLevelSliderNode.noUiSlider.updateOptions({
      range: {
        min,
        max,
      },
      step,
      start: max,
    });
  }
};

export const destroyEffectLevel = () => {
  if (effectLevelSliderNode.noUiSlider) {
    effectLevelSliderNode.noUiSlider.destroy();
  }
};
