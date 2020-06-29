'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var mapPin = mapBlock.querySelector('.map__pin--main');
  var mapWidth = mapBlock.clientWidth;

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var SHARP_END_PIN_HEIGHT = 22;
  var MIN_PIN_Y_AXIS = 130;
  var MAX_PIN_Y_AXIS = 630;

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

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();


      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coords = {
        x: mapPin.offsetLeft - shift.x,
        y: mapPin.offsetTop - shift.y
      };

      if (coords.x + MAIN_PIN_WIDTH / 2 <= 0) {
        mapPin.style.left = -MAIN_PIN_WIDTH / 2;
      } else if (coords.x + MAIN_PIN_WIDTH / 2 >= mapWidth) {
        mapPin.style.left = mapWidth;
      } else {
        mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
      }

      if (coords.y <= MIN_PIN_Y_AXIS) {
        mapPin.style.top = MIN_PIN_Y_AXIS;
      } else if (coords.y + MAIN_PIN_HEIGHT + SHARP_END_PIN_HEIGHT >= MAX_PIN_Y_AXIS) {
        mapPin.style.top = MAX_PIN_Y_AXIS + MAIN_PIN_HEIGHT + SHARP_END_PIN_HEIGHT;
      } else {
        mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      }

      calculateCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      calculateCoords();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var calculateCoords = function () {
    var coords = {
      x: parseInt(mapPin.style.left, 10) + MAIN_PIN_WIDTH / 2,
      y: parseInt(mapPin.style.top, 10) + MAIN_PIN_HEIGHT + SHARP_END_PIN_HEIGHT,
    };

    window.form.adFormAddress.value = coords.x + ', ' + coords.y;
  };

  window.map = {
    mapBlock: mapBlock,
    mapPin: mapPin,
    pinClickHandler: pinClickHandler,
    pinKeyDownHandler: pinKeyDownHandler
  };

})();
