'use strict';
(function () {
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

  var dataPhoto = [];

  var pictureTemplate = document.querySelector('#picture');
  var picturesContainer = document.querySelector('.pictures');

  // генерирует url фото
  function getPictureUrl(photoNumber) {
    return 'photos/' + photoNumber + '.jpg';
  }

  // сортирует массив в случайном порядке Сортировка Фишера-Йетса
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
    var comentsCount = window.util.getRandomNumber(1, 2);
    sortArray(comments);
    for (var i = 0; i < comentsCount; i++) {
      comment[i] = comments[i];
    }
    return comment;
  }

  function getDescription(descriptions) {
    return descriptions[window.util.getRandomNumber(0, descriptions.length - 1)];
  }

  function DataObject(photoNumber) {
    this.url = getPictureUrl(photoNumber);
    this.likes = window.util.getRandomNumber(15, 200);
    this.comments = getComment(COMMENTS_DATA);
    this.description = getDescription(DESCRIPTION_DATA);
  }

  function getDataObject() {
    for (var i = 0; i < PHOTO_NUMBERS_MAX; i++) {
      var photoNumber = i + 1;
      dataPhoto[i] = new DataObject(photoNumber);
      dataPhoto[i].id = i;
    }
  }

  // создает и заполняет DOM-элемент
  function createElement(obj) {
    var element = pictureTemplate.content.querySelector('.picture__link').cloneNode(true);
    var image = element.querySelector('img');
    var likes = element.querySelector('.picture__stat--likes');
    var comments = element.querySelector('.picture__stat--comments');

    image.src = obj.url;
    likes.textContent = obj.likes;
    comments.textContent = obj.comments.length;
    element.dataset.id = obj.id;
    return element;
  }

  function addFragment() {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PHOTO_NUMBERS_MAX; i++) {
      fragment.appendChild(createElement(dataPhoto[i]));
    }
    picturesContainer.appendChild(fragment);
  }

  getDataObject();

  addFragment();

  window.dataPhoto = dataPhoto;
})();
