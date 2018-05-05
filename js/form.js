'use strict';
(function () {
  var MAX_COUNT_HASHTAG = 5;
  var inputHashtag = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('#upload-submit');
  var form = document.querySelector('.img-upload__form');
  var imgError = document.querySelector('.img-upload__message--error');

  /**
   * Проверяет один хэштег на ограничения
   * @param  {string} hashtag
   * @return {boolean} возращает true или false
   */
  function validateHashtag(hashtag) {
    if (hashtag[0] !== '#') {
      inputHashtag.setCustomValidity('Хэштег должен начинатья с решетки');
      return false;
    } else if (hashtag.length === 1) {
      inputHashtag.setCustomValidity('Хэштег должен содержать значение кроме решетки');
      return false;
    } else if (hashtag.length > 20) {
      inputHashtag.setCustomValidity('Хэштег может быть длиной не более 20 символов');
      return false;
    } else if (hashtag.indexOf('#', 1) > 0) {
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
        if (hashtagArray.indexOf(hashtagArray[i], i + 1) > 0) {
          inputHashtag.setCustomValidity('Хэштеги не должны повторяться');
          break;
        }
      }
      if (hashtagArray.length > MAX_COUNT_HASHTAG) {
        inputHashtag.setCustomValidity('Хэштегов может быть максимум 5');
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
  function clearCustomValidity() {
    inputHashtag.setCustomValidity('');
  }

  submitButton.addEventListener('click', onSubmitButtonClick);

  inputHashtag.addEventListener('input', clearCustomValidity);
})();
