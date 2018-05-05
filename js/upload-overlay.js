'use strict';
(function () {
  var inputUploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var buttonCloseUploadPhoto = document.querySelector('.img-upload__cancel');
  var inputHashtag = document.querySelector('.text__hashtags');
  var textarea = document.querySelector('.text__description');
  var scaleEffect = document.querySelector('.scale');
  var form = document.querySelector('.img-upload__form');

  /**
   * закрывает оверлей по ESC
   * @param  {object} evt
   */
  function onUploadOverlayPressEsc(evt) {
    window.util.onPressEcs(evt, closeUploadOverlay);
  }

  /**
   * закрывает оверлей по клику на кнопку закрыть
   */
  function onButtonCloseUploadPhotoClick() {
    closeUploadOverlay();
  }

  /**
   * показывает оверлей форму с редактированием фотографии
   */
  function onInputPhotoUpload() {
    uploadOverlay.classList.remove('hidden');
    window.addEventListener('keydown', onUploadOverlayPressEsc);
    buttonCloseUploadPhoto.addEventListener('click', onButtonCloseUploadPhotoClick);
    scaleEffect.classList.add('hidden');
  }

  /**
   * закрывает форму редактирования фотографии, сбрасывает ее значения
   */
  function closeUploadOverlay() {
    uploadOverlay.classList.add('hidden');
    inputUploadFile.addEventListener('change', onInputPhotoUpload);
    window.removeEventListener('keydown', onUploadOverlayPressEsc);
    buttonCloseUploadPhoto.removeEventListener('click', onButtonCloseUploadPhotoClick);
    form.reset();
    window.photoEffects.returnEffectToDefault();
  }

  /**
   * не дает закрыть форму редактирования по ESC при фокусе на инпуте
   */
  function onInputFocus() {
    window.removeEventListener('keydown', onUploadOverlayPressEsc);
  }

  /**
   * при уходе фокуса с инпута возращает обработчик для закрытия формы ффода по ESC
   */
  function onInputBlur() {
    window.addEventListener('keydown', onUploadOverlayPressEsc);
  }

  inputUploadFile.addEventListener('change', onInputPhotoUpload);

  inputHashtag.addEventListener('focus', onInputFocus);
  inputHashtag.addEventListener('blur', onInputBlur);
  textarea.addEventListener('focus', onInputFocus);
  textarea.addEventListener('blur', onInputBlur);

  window.uploadOverlay = {
    closeUploadOverlay: closeUploadOverlay
  };
})();
