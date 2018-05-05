'use strict';
(function () {
  var dataPhoto = [];
  var pictureTemplate = document.querySelector('#picture');
  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');


  /**
   * создает и заполняет DOM-элемент
   * @param  {Object} obj Объект с данными одного фото
   * @return {Object}     Объект ссылка с миниатюрой картинки
   */
  function createElement(obj) {
    var element = pictureTemplate.content.querySelector('.picture__link').cloneNode(true);
    var image = element.querySelector('img');
    var likes = element.querySelector('.picture__stat--likes');
    var comments = element.querySelector('.picture__stat--comments');

    image.src = obj.url;
    likes.textContent = obj.likes;
    comments.textContent = obj.comments.length;
    return element;
  }

  /**
   * Создает фразмент и добавляет туда элементы с сылками, на ссылку сразу вешается обработчик
   * @param {Array} photos массив с фотографиями
   */
  function addFragment(photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photoItem) {
      var photoElement = createElement(photoItem);
      photoElement.addEventListener('click', function () {
        window.bigPicture.showBigPicture(photoItem);
      });
      fragment.appendChild(photoElement);
    });
    picturesContainer.appendChild(fragment);
  }

  function reloadPhotoLink(sorteredPhoto) {
    var currentLinks = picturesContainer.querySelectorAll('.picture__link');

    for (var i = 0; i < currentLinks.length; i++) {
      picturesContainer.removeChild(currentLinks[i]);
    }
    addFragment(sorteredPhoto);
  }

  /**
   * Добавляет данные на страницу, вызывается после загрузки данных
   * @param  {Object} data Объект, получаемый по запросу с сервера
   */
  function onDataload(data) {
    dataPhoto = data;
    addFragment(dataPhoto);
    window.data.dataPhoto = dataPhoto;
    filters.classList.remove('img-filters--inactive');
  }

  window.backend.requestLoadData(onDataload, window.backend.onRequestError);

  window.data = {
    reloadPhotoLink: reloadPhotoLink
  };
})();
