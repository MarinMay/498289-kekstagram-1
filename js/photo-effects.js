'use strict';
(function () {
  var MIN_COORDS_X = 0;
  var MAX_COORDS_X = 100;
  var MAX_PERCENT = 100;
  var MIN_RESIZE_VALUE = 25;
  var MAX_RESIZE_VALUE = 100;
  var RESIZE_STEP = 25;
  var DEFAULT_INPUT_EFFECT_VALUE = 100;
  var effectsTogglers = document.querySelectorAll('.effects__label');
  var previewPhoto = document.querySelector('.img-upload__preview');
  var inputEffectLevel = document.querySelector('[name="effect-level"]');
  var scaleEffect = document.querySelector('.scale');
  var lineScaleEffect = document.querySelector('.scale__line');
  var pinScaleEffect = document.querySelector('.scale__pin');
  var levelScaleEffect = document.querySelector('.scale__level');
  var currentEffect = 'effect-none';
  var maxWidthEffectLine;
  var inputResize = document.querySelector('.resize__control--value');
  var resizeControlMinus = document.querySelector('.resize__control--minus');
  var resizeControlPlus = document.querySelector('.resize__control--plus');

  /**
   * создает обект с данными об эффекте
   *
   * @constructor
   * @this {EffectsData}
   * @param {string} className класс фильтра
   * @param {string} filterName имя филтьра
   * @param {number} filterMin минимальное значение филтьра
   * @param {number} filterMax максимальное значение филтьра
   * @param {string} filterPostfix еденица измерения фильра
   */
  function EffectsData(className, filterName, filterMin, filterMax, filterPostfix) {
    this.class = className;
    this.filterName = filterName;
    this.filterMin = filterMin;
    this.filterMax = filterMax;
    this.filterPostfix = filterPostfix || '';
  }

  /**
   * получет значение фильтра готовое для стилей в зависимости от значения инпута
   *
   * @this {EffectsData}
   * @param {number} inputValue значение инпута насыщенности эффекта
   * @return {string} строка с готовым стилем для картинки
   */
  EffectsData.prototype.getFilter = function (inputValue) {
    var filterValue = (this.filterMax - this.filterMin) / MAX_PERCENT * inputValue + this.filterMin;
    return this.filterName + '(' + filterValue + this.filterPostfix + ')';
  };

  var effects = {
    'effect-chrome': new EffectsData('effects__preview--chrome', 'grayscale', 0, 1),
    'effect-sepia': new EffectsData('effects__preview--sepia', 'sepia', 0, 1),
    'effect-marvin': new EffectsData('effects__preview--marvin', 'invert', 0, 100, '%'),
    'effect-phobos': new EffectsData('effects__preview--phobos', 'blur', 0, 3, 'px'),
    'effect-heat': new EffectsData('effects__preview--heat', 'brightness', 1, 3)
  };

  /**
   * удаляет все инлайновые стили, и оставляет классы которые не начинаются с 'effects'
   *
   * @param {Object} photo - большое фото с превью эффекта
  */
  function removeEffects(photo) {
    photo.removeAttribute('style');
    if (photo.className.indexOf('effects') > 0) {
      var classesPhoto = [].filter.call(photo.classList, function (photoClass) {
        return photoClass.indexOf('effects') < 0;
      });
      photo.classList = classesPhoto;
    }
  }

  /**
   * регулирует ширину и положение ползунка от значения инпута
   */
  function updateScaleLevelEffect() {
    levelScaleEffect.style.width = inputEffectLevel.value + '%';
    pinScaleEffect.style.left = inputEffectLevel.value + '%';
  }

  /**
   * устанавливает в инпут значение от текущей ширины,
   * обновляет ползунок, обновляет насыщенность эффекта
   *
   *  @param {Object} effect - объект с данными об эффекте
   */
  function updateEffect(effect) {
    var currentWidth = levelScaleEffect.offsetWidth;
    inputEffectLevel.value = Math.round(currentWidth / maxWidthEffectLine * MAX_PERCENT);
    previewPhoto.style.filter = effect.getFilter(inputEffectLevel.value);
  }

  /**
   * клик по лейблу с эффектом переключает эффект
   *
   * @param {Object} evt событие
   */
  function onEffectsTogglerClick(evt) {
    var toggler = evt.target.closest('.effects__label');
    if (toggler) {
      removeEffects(previewPhoto);
      resizePhoto(inputResize.value.slice(0, -1));
      currentEffect = toggler.getAttribute('for');
      if (currentEffect === 'effect-none') {
        scaleEffect.classList.add('hidden');
        return;
      }
      if (scaleEffect.classList.contains('hidden')) {
        scaleEffect.classList.remove('hidden');
      }
      maxWidthEffectLine = lineScaleEffect.offsetWidth;
      previewPhoto.classList.add(effects[currentEffect].class);
      inputEffectLevel.value = DEFAULT_INPUT_EFFECT_VALUE;
      updateScaleLevelEffect();
      previewPhoto.style.filter = effects[currentEffect].getFilter(inputEffectLevel.value);
    }
  }

  /**
   * применяет стили scale к фото, от значения инпута
   * @param  {number} scaleValue число значения ипнута
   */
  function resizePhoto(scaleValue) {
    previewPhoto.style.transform = 'scale(' + (scaleValue / MAX_PERCENT) + ')';
  }

  /**
   * увеличивает значение инпута на нужный шаг
   */
  function onResizeControlsPlusClick() {
    var inputValue = inputResize.value.slice(0, -1);
    inputValue = Number(inputValue) + RESIZE_STEP;
    if (inputValue > MAX_RESIZE_VALUE) {
      inputValue = MAX_RESIZE_VALUE;
    }
    resizePhoto(inputValue);
    inputResize.value = inputValue + '%';
  }

  /**
   * уменьшает значение инпута на нужный шаг
   */
  function onResizeControlsMinusClick() {
    var inputValue = inputResize.value.slice(0, -1);
    inputValue = Number(inputValue) - RESIZE_STEP;
    if (inputValue < MIN_RESIZE_VALUE) {
      inputValue = MIN_RESIZE_VALUE;
    }
    resizePhoto(inputValue);
    inputResize.value = inputValue + '%';
  }

  /**
   * сбрасывает эффекты после сброса значений инпутов
   */
  function returnEffectToDefault() {
    removeEffects(previewPhoto);
    updateScaleLevelEffect();
  }

  /**
   * ограничение по оси Х
   * @param {number} Xcoord координата X
   * @param {number} XMin
   * @param {number} XMax
   * @return {number} координата X не больше и не меньше установленных значений
   */
  function setLimitsX(Xcoord, XMin, XMax) {
    if (Xcoord < XMin) {
      Xcoord = XMin;
    }
    if (Xcoord > XMax) {
      Xcoord = XMax;
    }
    return Xcoord;
  }

  /**
   * запускает передвижение пина по шкале
   * @param  {object} evtDown
   */
  function onPinMouseDown(evtDown) {
    evtDown.preventDefault();
    var control = evtDown.target;
    var sartCoordsX = evtDown.clientX;// значение Х мыши в момент начала движения

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shiftX = sartCoordsX - moveEvt.clientX; // сдвиг в пикселях
      var newX = Math.round((control.offsetLeft - shiftX) / maxWidthEffectLine * MAX_PERCENT); // новое значение x в процентах

      sartCoordsX = moveEvt.clientX; // новое значение Х мыши
      newX = setLimitsX(newX, MIN_COORDS_X, MAX_COORDS_X);
      control.style.left = newX + '%';
      levelScaleEffect.style.width = newX + '%';
      updateEffect(effects[currentEffect]);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      updateEffect(effects[currentEffect]);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  resizeControlMinus.addEventListener('click', onResizeControlsMinusClick);
  resizeControlPlus.addEventListener('click', onResizeControlsPlusClick);

  pinScaleEffect.addEventListener('mousedown', onPinMouseDown);

  effectsTogglers.forEach(function (toggler) {
    toggler.addEventListener('click', onEffectsTogglerClick);
  });

  window.photoEffects = {
    returnEffectToDefault: returnEffectToDefault,
  };
})();
