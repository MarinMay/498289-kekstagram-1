'use strict';
(function () {
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var REQUEST_TIMEOUT = 10000;
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
  };

  /**
   * создает новый xhr  запрос, задает параметры, вешает ему обработчки
   * @param  {Function} onSuccess callback при успешном запросе
   * @param  {Function} onError   callback при неуспешном запросе
   * @return {Object} объект xhr запроса
   */
  function createRequest(onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = REQUEST_TIMEOUT; // 10s

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.responseType = 'json';
    return xhr;
  }

  /**
   * Отправляет запрос на загрузку данных
   *
   * @param  {function} onSuccess callback при успешной загрузке
   * @param  {function} onError   callback при неуспешной загрузке
   */
  function requestLoadData(onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  /**
   * Отправляет запрос на отправку данных
   *
   * @param  {object} data данные для отправки на сервер
   * @param  {function} onSuccess callback при успешной загрузке
   * @param  {function} onError   callback при неуспешной загрузке
   */
  function requestUploadData(data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  }

  /**
   * сообщение об ошибке
   * @param  {string} errorMessage
   */
  function onRequestError(errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    var button = document.createElement('button');
    document.body.insertAdjacentElement('afterbegin', node);
    node.innerHTML = '<p>' + errorMessage + '</p>';
    button.textContent = 'OK';
    node.appendChild(button);
    button.addEventListener('click', function () {
      document.body.removeChild(node);
    });
  }

  window.backend = {
    requestLoadData: requestLoadData,
    requestUploadData: requestUploadData,
    onRequestError: onRequestError
  };
})();
