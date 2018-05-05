'use strict';
(function () {
  var bigPicturesContainer = document.querySelector('.big-picture');
  var bigPicturesImage = bigPicturesContainer.querySelector('.big-picture__img img');
  var bigPicturesLikes = bigPicturesContainer.querySelector('.likes-count');
  var bigPicturesCommentsCount = bigPicturesContainer.querySelector('.comments-count');
  var bigPicturesCommentsList = bigPicturesContainer.querySelector('.social__comments');
  var bigPicturesCommentsItem = bigPicturesContainer.querySelector('.social__comment');
  var bigPicturesCaption = bigPicturesContainer.querySelector('.social__caption');

  var bigPicturesCommentsCountWrapper = bigPicturesContainer.querySelector('.social__comment-count');
  var bigPicturesCommentsLoad = bigPicturesContainer.querySelector('.social__comment-loadmore');
  var buttonCloseBigPicture = document.querySelector('.big-picture__cancel');

  /**
   * Вставляет комментарии и з данных в разметку
   * @param  {Array} comments Массив с комментариями
   */
  function showComments(comments) {
    bigPicturesCommentsList.innerHTML = '';

    for (var i = 1; i < comments.length; i++) {
      var commentItem = bigPicturesCommentsItem.cloneNode(true);
      var commentAvatar = commentItem.querySelector('img');
      commentAvatar.src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
      commentItem.childNodes[2].textContent = comments[i];
      bigPicturesCommentsList.appendChild(commentItem);
    }
  }

  /**
   * выводит оверлей с большой фототграфией
   * @param  {Щиоусе} data Объект с данными одной фото
   */
  function showBigPicture(data) {
    bigPicturesImage.src = data.url;
    bigPicturesLikes.textContent = data.likes;
    bigPicturesCaption.textContent = data.comments[0];
    bigPicturesCommentsCount.textContent = data.comments.length;
    bigPicturesContainer.classList.remove('hidden');
    showComments(data.comments);
    bigPicturesCommentsCountWrapper.classList.add('visually-hidden');
    bigPicturesCommentsLoad.classList.add('visually-hidden');
    window.addEventListener('keydown', onBigPicturePressEsc);
    buttonCloseBigPicture.addEventListener('click', onButtonCloseBigPictureClick);
  }

  /**
   * закрытие большого фото по ESC
   * @param  {Щиоусе} evt Объект события keydown
   */
  function onBigPicturePressEsc(evt) {
    window.util.onPressEcs(evt, closeBigPicture);
  }

  /**
   * закрытие большого фото по клик по кнопке крестик
   */
  function onButtonCloseBigPictureClick() {
    closeBigPicture();
  }

  /**
   * Закрывает большую фото, удаляет обработчики закрытия
   */
  function closeBigPicture() {
    bigPicturesContainer.classList.add('hidden');
    bigPicturesCommentsCountWrapper.classList.remove('visually-hidden');
    bigPicturesCommentsLoad.classList.remove('visually-hidden');
    window.removeEventListener('keydown', onBigPicturePressEsc);
    buttonCloseBigPicture.removeEventListener('click', onButtonCloseBigPictureClick);
  }

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
