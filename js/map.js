'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPin = mapBlock.querySelector('.map__pin--main');

  mapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.activationPage();
      window.form.setAddressValue(true);
    }
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      window.activationPage();
      window.form.setAddressValue(true);
    }
  });

  window.map = {
    mapBlock: mapBlock,
    mapPin: mapPin
  };

})();
