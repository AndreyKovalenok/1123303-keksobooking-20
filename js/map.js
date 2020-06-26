'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPin = mapBlock.querySelector('.map__pin--main');

  var pinClickHandler = function (evt) {
    if (evt.button === 0) {
      window.activationPage();
      window.form.setAddressValue(true);
    }

    mapPin.removeEventListener('mousedown', pinClickHandler);
  };

  var pinKeyDownHandler = function (evt) {
    if (evt.keyCode === 13) {
      window.activationPage();
      window.form.setAddressValue(true);
    }

    mapPin.removeEventListener('keydown', pinKeyDownHandler);
  };

  mapPin.addEventListener('mousedown', pinClickHandler);

  mapPin.addEventListener('keydown', pinKeyDownHandler);

  window.map = {
    mapBlock: mapBlock,
    mapPin: mapPin,
    pinClickHandler: pinClickHandler,
    pinKeyDownHandler: pinKeyDownHandler
  };

})();
