'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;

  /**
   * получает случайное число от min до max
   * @param  {Number} min минимаьное число
   * @param  {Number} max максимальное число
   * @return {Number}     случайное число от min до max
   */
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Нажат ESC
   * @param  {Object}   evt событие нажатия клавиши
   * @param  {function} cb  callback
   */
  function onPressEcs(evt, cb) {
    if (evt.keyCode === ESC_KEYCODE) {
      cb();
    }
  }

  /**
   * устранение 'дребзга' - вызывает callback не чаще заданного интервала
   * @param  {Function} cb
   */
  function debounce(cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  }

  window.util = {
    getRandomNumber: getRandomNumber,
    onPressEcs: onPressEcs,
    debounce: debounce
  };
})();
