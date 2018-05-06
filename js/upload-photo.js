'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserPhoto = document.querySelector('#upload-file');
  var photoPreview = document.querySelector('.img-upload__preview img');

  /**
   * проверка файла на соответствие формату
   * @param  {String} name имя файлы
   * @return {String}
   */
  function mutchesNameFiles(name) {
    return FILE_TYPES.some(function (it) {
      return name.endsWith(it);
    });
  }

  function onPhotoChange() {
    var file = fileChooserPhoto.files[0];
    uploadPhoto(file);
  }

  /**
   * показывает загруженное фото
   * @param  {Object} file
   */
  function uploadPhoto(file) {
    var fileName = file.name.toLowerCase();
    var matches = mutchesNameFiles(fileName);

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  fileChooserPhoto.addEventListener('change', onPhotoChange);
})();
