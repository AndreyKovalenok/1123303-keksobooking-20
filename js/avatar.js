'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var housingChooser = document.querySelector('.ad-form__upload input');
  var housingPreview = document.querySelector('.ad-form__photo');

  var changeHandler = function (input, preview) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    changeHandler(avatarChooser, avatarPreview);
  });

  housingChooser.addEventListener('change', function () {
    var img = document.createElement('img');
    img.style.width = '70px';
    img.style.height = '70px';
    changeHandler(housingChooser, img);
    housingPreview.innerHTML = '';
    housingPreview.appendChild(img);
  });

  window.avatar = {
    preview: avatarPreview,
    housingPreview: housingPreview
  };
})();
