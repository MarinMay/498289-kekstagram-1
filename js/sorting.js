'use strict';
(function () {
  var filters = document.querySelector('.img-filters__form');

  var sort = {
    'filter-recommended': sortArrayReccomended,
    'filter-popular': sortArrayPopular,
    'filter-discussed': sortArayDiscussed,
    'filter-random': sortArrayRandom
  };

  /**
   * сортирует массив в случайном порядке
   * @param  {Array} array
   */
  function sortArrayRandom(array) {
    var resultIndex = array.length;
    var currentIndex;
    var valueResultIndex;

    while (resultIndex) {
      currentIndex = Math.floor(Math.random() * resultIndex--);
      valueResultIndex = array[resultIndex];
      array[resultIndex] = array[currentIndex];
      array[currentIndex] = valueResultIndex;
    }
  }

  /**
   * сортирует массив в по количеству лайков по убыванию
   * @param  {Array} array
   */
  function sortArrayPopular(array) {
    array.sort(function (photoA, photoB) {
      return photoB.likes - photoA.likes;
    });
  }

  /**
   * сортирует массив по количеству комментариев по убыванию
   * @param  {Array} array
   */
  function sortArayDiscussed(array) {
    array.sort(function (photoA, photoB) {
      return photoB.comments.length - photoA.comments.length;
    });
  }

  /**
   * ничего не делает с масивом, нужна чтобы не было ошибок
   * в функции выбора метода сортировки
   * @param  {Array} array
   * @return {Array}
   */
  function sortArrayReccomended(array) {
    return array;
  }


  /**
   * убирает активный стиль у предыдущей кнопки фильтра
   */
  function makeButtonInactive() {
    var buttonActive = document.querySelector('.img-filters__button--active');
    if (buttonActive) {
      buttonActive.classList.remove('img-filters__button--active');
    }
  }

  /**
   * сортирует массив, и запускает перерисовку фото
   * @param  {Object} evt
   */
  function apdatePhoto(evt) {
    if (evt.target.tagName === 'BUTTON' &&
          !evt.target.classList.contains('img-filters__button--active')) {
      makeButtonInactive();
      var sortingArray = window.data.dataPhotos.slice(0);
      sort[evt.target.id](sortingArray);
      window.data.reloadPhotoLink(sortingArray);
      evt.target.classList.add('img-filters__button--active');
    }
  }

  /**
   * запускает перерисовку фото по клику на кнопку с задержкой debounce
   * @param  {Object} evt
   */
  function onfiltersClick(evt) {
    window.util.debounce(apdatePhoto.bind(null, evt));
  }

  filters.addEventListener('click', onfiltersClick);
})();
