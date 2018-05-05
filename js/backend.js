'use strict';
(function () {
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var REQUEST_TIMEOUT = 10000;
  var STATUS_CODE = {
    ok: 200,
    badRequest: 400,
    notFound: 404
  };

  /**
   * Отправляет запрос на загрузку данных
   *
   * @param  {function} onSuccess callback при успешной загрузке
   * @param  {function} onError   callback при неуспешной загрузке
   */
  function requestLoadData(onSuccess, onError) {
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
        case STATUS_CODE.ok:
          onSuccess(xhr.response);
          break;
        case STATUS_CODE.badRequest:
          error = 'Неверный запрос';
          break;
        case STATUS_CODE.notFound:
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
        case STATUS_CODE.ok:
          onSuccess(xhr.response);
          break;
        case STATUS_CODE.badRequest:
          error = 'Неверный запрос';
          break;
        case STATUS_CODE.notFound:
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
