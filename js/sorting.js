'use strict';
(function () {
  var filters = document.querySelector('.img-filters__form');
  var buttonRecommendedPhoto = document.querySelector('#filter-recommended');
  var buttonPopularPhoto = document.querySelector('#filter-popular');
  var buttonDiscussedPhoto = document.querySelector('#filter-discussed');
  var buttonRandomPhoto = document.querySelector('#filter-random');


  // сортирует массив в случайном порядке
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

  function sortArrayPopular(array) {
    array.sort(function (photoA, photoB) {
      return photoB.likes - photoA.likes;
    });
  }

  function sortArayDiscussed(array) {
    array.sort(function (photoA, photoB) {
      return photoB.comments.length - photoA.comments.length;
    });
  }

  function sortArrayReccomended(array) {
    return array;
  }

  var sort = {
    'filter-recommended': sortArrayReccomended,
    'filter-popular': sortArrayPopular,
    'filter-discussed': sortArayDiscussed,
    'filter-random': sortArrayRandom
  };

  function makeButtonInactive() {
    var buttonActive = document.querySelector('.img-filters__button--active');
    if (buttonActive) {
      buttonActive.classList.remove('img-filters__button--active');
    }
  }

  function apdatePhoto(evt) {
    if (evt.target.tagName === 'BUTTON' &&
          !evt.target.classList.contains('img-filters__button--active')) {
      makeButtonInactive();
      var sortingArray = window.data.dataPhoto.slice(0);
      sort[evt.target.id](sortingArray);
      window.data.reloadPhotoLink(sortingArray);
      evt.target.classList.add('img-filters__button--active');
    }
  }

  function onfiltersClick(evt) {
    window.util.debounce(apdatePhoto.bind(null, evt));
  }


  filters.addEventListener('click', onfiltersClick);

})();
