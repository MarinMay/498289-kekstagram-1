'use strict';
(function () {
  // --------------------показывает окно редактирования фото----------------

  var inputUploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var buttonCloseUploadPhoto = document.querySelector('.img-upload__cancel');
  var inputHashtag = document.querySelector('.text__hashtags');
  var textarea = document.querySelector('.text__description');
  var scaleEffect = document.querySelector('.scale');

  function onUploadOverlayPressEsc(evt) {
    window.util.onPressEcs(evt, closeUploadOverlay);
  }

  function onButtonCloseUploadPhotoClick() {
    closeUploadOverlay();
  }

  function onInputPhotoUpload() {
    uploadOverlay.classList.remove('hidden');
    window.addEventListener('keydown', onUploadOverlayPressEsc);
    buttonCloseUploadPhoto.addEventListener('click', onButtonCloseUploadPhotoClick);
    scaleEffect.classList.add('hidden');
  }

  function closeUploadOverlay() {
    uploadOverlay.classList.add('hidden');
    inputUploadFile.addEventListener('change', onInputPhotoUpload);
    window.removeEventListener('keydown', onUploadOverlayPressEsc);
    buttonCloseUploadPhoto.removeEventListener('click', onButtonCloseUploadPhotoClick);
  }

  function onInputFocus() {
    window.removeEventListener('keydown', onUploadOverlayPressEsc);
  }

  function onInputBlur() {
    window.addEventListener('keydown', onUploadOverlayPressEsc);
  }

  inputUploadFile.addEventListener('change', onInputPhotoUpload);

  inputHashtag.addEventListener('focus', onInputFocus);
  inputHashtag.addEventListener('blur', onInputBlur);
  textarea.addEventListener('focus', onInputFocus);
  textarea.addEventListener('blur', onInputBlur);
})();
