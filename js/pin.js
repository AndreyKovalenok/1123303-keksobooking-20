'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPinsContainer = document.querySelector('.map__pins');

  var renderPin = function (offer, index, data) {
    var pin = mapPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = offer.location.y - PIN_HEIGHT + 'px';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;

    pin.addEventListener('click', function () {
      window.card.openCard(data, index);

      document.addEventListener('keydown', window.card.cardEscPressHandler);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        window.card.openCard(data, index);

        document.addEventListener('keydown', window.card.cardEscPressHandler);
      }
    });

    return pin;
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(pins).forEach(function (pin) {
      pin.remove();
    });
  };

  var renderPins = function (data, limit) {
    for (var i = 0; i < limit; i++) {
      var pin = renderPin(data[i], i, data);
      fragment.appendChild(pin);
    }
  };

  var mounPins = function () {
    mapPinsContainer.appendChild(fragment);
  };

  var fragment = document.createDocumentFragment();

  window.pin = {
    removePins: removePins,
    renderPins: renderPins,
    mounPins: mounPins
  };

})();
