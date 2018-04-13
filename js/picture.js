'use strict';
(function() {
  var PHOTO_NUMBERS_MIN = 1;
  var PHOTO_NUMBERS_MAX = 25;

  var COMMENTS_DATA = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTION_DATA = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var data = [];

  var pictureTemplate = document.querySelector('#picture');
  var picturesContainer = document.querySelector('.pictures');
  var bigPicturesContainer = document.querySelector('.big-picture');
  var bigPicturesImage = bigPicturesContainer.querySelector('.big-picture__img img');
  var bigPicturesLikes = bigPicturesContainer.querySelector('.likes-count');
  var bigPicturesCommentsCount = bigPicturesContainer.querySelector('.comments-count');
  var bigPicturesCommentsList = bigPicturesContainer.querySelector('.social__comments');
  var bigPicturesCommentsItem = bigPicturesContainer.querySelector('.social__comment');
  var bigPicturesCommentsCountWrapper = bigPicturesContainer.querySelector('.social__comment-count');
  var bigPicturesCommentsLoad = bigPicturesContainer.querySelector('.social__comment-loadmore');

  // создает массив номеров фото нужной длины
  function getArrayNumbers(minValue, arrayLength) {
    var array = [];
    for (var i = minValue; i <= arrayLength; i++) {
      array.push(i);
    }
    return array;
  }

  // получает случайное число от min до max
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // генерирует url фото
  function getPictureUrl(photoNumber) {
    return 'photos/' + photoNumber + '.jpg';
  }

  // сортирует массив в случайном порядке
  function sortArray(array) {
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

  // возвращает один или два комментария из массива
  function getComment(comments) {
    var comment = [];
    var comentsCount = getRandomNumber(1, 2);
    sortArray(comments);
    for (var i = 0; i < comentsCount ; i++) {
      comment[i] = comments[i];
    }
    return comment;
  }

  function getDescription(descriptions) {
    return descriptions[getRandomNumber(0, descriptions.length - 1)];
  }

  function DataObject(pictureNumbers) {
    this.url = getPictureUrl(pictureNumbers);
    this.likes = getRandomNumber(15, 200);
    this.comments = getComment(COMMENTS_DATA, this.comentsCount);
    this.description = getDescription(DESCRIPTION_DATA);
  }

  function getDataObject() {
    for (var i = 0; i < PHOTO_NUMBERS_MAX; i++) {
      data[i] = new DataObject(pictureNumbers[i]);
    };
  }

  // создает b заполняет DOM-элемент
  function createElement(obj) {
    var element = pictureTemplate.content.cloneNode(true);
    var image = element.querySelector('img');
    var likes = element.querySelector('.picture__stat--likes');
    var comments = element.querySelector('.picture__stat--comments');

    image.src = obj.url;
    likes.textContent = obj.likes;
    comments.textContent = obj.comments.length;
    return element;
  }

  function addFragment() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PHOTO_NUMBERS_MAX; i++) {
      fragment.appendChild(createElement(data[i]));
    }
    picturesContainer.appendChild(fragment);
  }

  function showComments(comments) {
    bigPicturesCommentsList.innerHTML = '';

    for(var i = 0; i < comments.length; i++)  {
      var commentItem = bigPicturesCommentsItem.cloneNode(true);
      var commentAvatar = commentItem.querySelector('img');
      commentAvatar.src = 'img/avatar-' + getRandomNumber(1, 6) +'.svg';
      commentItem.childNodes[2].textContent = comments[i];
      bigPicturesCommentsList.appendChild(commentItem);
    }
  }

  function showBigPicture(data) {
    bigPicturesImage.src = data.url;
    bigPicturesLikes.textContent = data.likes;
    bigPicturesCommentsCount.textContent = data.comments.length;
    bigPicturesContainer.classList.remove('hidden');
    showComments(data.comments);
    bigPicturesCommentsCountWrapper.classList.add('visually-hidden');
    bigPicturesCommentsLoad.classList.add('visually-hidden');
  }


  var pictureNumbers = getArrayNumbers(PHOTO_NUMBERS_MIN, PHOTO_NUMBERS_MAX);

  getDataObject();

  addFragment();

  showBigPicture(data[0]);

})();
