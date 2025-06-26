const DEFAULT_EFFECT_LEVEL = 100;

const effects = [
  {
    name: 'none',
    options: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    },
    setFilter: () => 'none'
  },
  {
    name: 'chrome',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    setFilter: (value) => `grayscale(${value})`
  },
  {
    name: 'sepia',
    options: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    },
    setFilter: (value) => `sepia(${value})`
  },
  {
    name: 'marvin',
    options: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    },
    setFilter: (value) => `invert(${value}%)`
  },
  {
    name: 'phobos',
    options: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    },
    setFilter: (value) => `blur(${value}px)`
  },
  {
    name: 'heat',
    options: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    },
    setFilter: (value) => `brightness(${value})`
  }
];

const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');

const applyEffect = () => {
  const selectedEffectName = effectsList.querySelector('.effects__radio:checked').value;
  const effect = effects.find((effectItem) => effectItem.name === selectedEffectName);
  if (selectedEffectName === 'none') {
    previewImage.style.filter = effect.setFilter();
    effectLevelContainer.style.display = 'none';
    effectLevelValue.value = '';
  } else {
    const value = effectLevelSlider.noUiSlider.get();
    previewImage.style.filter = effect.setFilter(value);
    effectLevelContainer.style.display = 'block';
    effectLevelValue.value = parseFloat(value) % 1 === 0 ? parseInt(value, 10) : parseFloat(value).toFixed(1);
  }
};

const resetEffect = () => {
  const selectedEffectName = effectsList.querySelector('.effects__radio:checked').value;
  const effect = effects.find((effectItem) => effectItem.name === selectedEffectName);
  if (effectLevelSlider && effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.updateOptions({
      range: effect.options.range,
      start: effect.options.start,
      step: effect.options.step
    });
    applyEffect();
  }
};

const initializeSlider = () => {
  if (effectLevelSlider) {
    noUiSlider.create(effectLevelSlider, {
      range: {
        min: 0,
        max: 100 },
      start: DEFAULT_EFFECT_LEVEL,
      step: 1,
      connect: 'lower'
    });

    effectLevelSlider.noUiSlider.on('update', () => {
      const value = effectLevelSlider.noUiSlider.get();
      effectLevelValue.value = value;
      applyEffect();
    });
  }
};

export { initializeSlider, resetEffect };
