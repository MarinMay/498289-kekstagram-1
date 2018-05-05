'use strict';
(function () {
  var picturesContainer = document.querySelector('.pictures');
  var bigPicturesContainer = document.querySelector('.big-picture');
  var bigPicturesImage = bigPicturesContainer.querySelector('.big-picture__img img');
  var bigPicturesLikes = bigPicturesContainer.querySelector('.likes-count');
  var bigPicturesCommentsCount = bigPicturesContainer.querySelector('.comments-count');
  var bigPicturesCommentsList = bigPicturesContainer.querySelector('.social__comments');
  var bigPicturesCommentsItem = bigPicturesContainer.querySelector('.social__comment');
  var bigPicturesCommentsCountWrapper = bigPicturesContainer.querySelector('.social__comment-count');
  var bigPicturesCommentsLoad = bigPicturesContainer.querySelector('.social__comment-loadmore');
  var buttonCloseBigPicture = document.querySelector('.big-picture__cancel');

  function showComments(comments) {
    bigPicturesCommentsList.innerHTML = '';

    for (var i = 0; i < comments.length; i++) {
      var commentItem = bigPicturesCommentsItem.cloneNode(true);
      var commentAvatar = commentItem.querySelector('img');
      commentAvatar.src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
      commentItem.childNodes[2].textContent = comments[i];
      bigPicturesCommentsList.appendChild(commentItem);
    }
  }

  //  выводит оверлей с большой фототграфией
  function showBigPicture(data) {
    bigPicturesImage.src = data.url;
    bigPicturesLikes.textContent = data.likes;
    bigPicturesCommentsCount.textContent = data.comments.length;
    bigPicturesContainer.classList.remove('hidden');
    showComments(data.comments);
    bigPicturesCommentsCountWrapper.classList.add('visually-hidden');
    bigPicturesCommentsLoad.classList.add('visually-hidden');
  }

  // закрытие большого фото по ESC
  function onBigPicturePressEsc(evt) {
    window.util.onPressEcs(evt, closeBigPicture);
  }

  // закрытие большого фото по клик по кнопке крестик
  function onButtonCloseBigPictureClick() {
    closeBigPicture();
  }

  // открывает большую фотографию по клику на мелкие картинки
  function onPhotosClick(evt) {
    var link = evt.target.closest('.picture__link');
    if (link) {
      showBigPicture(window.dataPhoto[link.dataset.id]);
      picturesContainer.removeEventListener('click', onPhotosClick);
      window.addEventListener('keydown', onBigPicturePressEsc);
      buttonCloseBigPicture.addEventListener('click', onButtonCloseBigPictureClick);
    }
  }

  function closeBigPicture() {
    bigPicturesContainer.classList.add('hidden');
    bigPicturesCommentsCountWrapper.classList.remove('visually-hidden');
    bigPicturesCommentsLoad.classList.remove('visually-hidden');
    picturesContainer.addEventListener('click', onPhotosClick);
    window.removeEventListener('keydown', onBigPicturePressEsc);
    buttonCloseBigPicture.removeEventListener('click', onButtonCloseBigPictureClick);
  }

  picturesContainer.addEventListener('click', onPhotosClick);
})();
