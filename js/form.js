'use strict';
(function () {
  var inputHashtag = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('#upload-submit');
  var form = document.querySelector('.img-upload__form');
  var imgError = document.querySelector('.img-upload__message--error');

  var Hashtags = {
    SHARP_POSITION: 0,
    START_SHARP_POSITION_NOT_VALID: 1,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    MAX_COUNT: 5
  };

  /**
   * Проверяет один хэштег на ограничения
   * @param  {string} hashtag
   * @return {boolean} возращает true или false
   */
  function validateHashtag(hashtag) {
    if (hashtag[Hashtags.SHARP_POSITION] !== '#') {
      inputHashtag.setCustomValidity('Хэштег должен начинатья с решетки');
      return false;
    } else if (hashtag.length < Hashtags.MIN_LENGTH) {
      inputHashtag.setCustomValidity('Хэштег должен содержать значение кроме решетки');
      return false;
    } else if (hashtag.length > Hashtags.MAX_LENGTH) {
      inputHashtag.setCustomValidity('Хэштег может быть длиной не более' +
        Hashtags.MAX_LENGTH + 'символов');
      return false;
    } else if (hashtag.indexOf('#', Hashtags.START_SHARP_POSITION_NOT_VALID) > 0) {
      inputHashtag.setCustomValidity('Хэштег должен разделяться пробелом');
      return false;
    }
    return true;
  }
  function showErrorImage() {
    imgError.classList.remove('hidden');
  }

  /**
   * Обработчик события click
   * @param  {Object} evt click
   */
  function onSubmitButtonClick(evt) {
    if (inputHashtag.value !== '') {
      var hashtagArray = inputHashtag.value.toLowerCase().split(' ');
      for (var i = 0; i < hashtagArray.length; i++) {
        var isHashtagValid = validateHashtag(hashtagArray[i]);
        if (!isHashtagValid) {
          break;
        }
        var positionNextHashtag = i + 1;
        if (hashtagArray.indexOf(hashtagArray[i], positionNextHashtag) > 0) {
          inputHashtag.setCustomValidity('Хэштеги не должны повторяться');
          break;
        }
      }
      if (hashtagArray.length > Hashtags.MAX_COUNT) {
        inputHashtag.setCustomValidity('Хэштегов может быть максимум ' + Hashtags.MAX_COUNT);
      }
    }

    if (!inputHashtag.validationMessage) {
      evt.preventDefault();
      var formData = new FormData(form);
      window.backend.requestUploadData(formData, window.uploadOverlay.closeUploadOverlay, showErrorImage);
    }
  }

  /**
   * Очищает кастомное сообщение об ошибке
   */
  function onInputInput() {
    inputHashtag.setCustomValidity('');
  }

  submitButton.addEventListener('click', onSubmitButtonClick);
  inputHashtag.addEventListener('input', onInputInput);
})();
