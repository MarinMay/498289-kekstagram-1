'use strict';
(function () {
  var ESC_KEYCODE = 27;

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

  window.util = {
    getRandomNumber: getRandomNumber,
    onPressEcs: onPressEcs
  };
})();
