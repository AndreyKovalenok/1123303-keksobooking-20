'use strict';

(function () {

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPinsContainer = document.querySelector('.map__pins');

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var renderPin = function (offer) {
    var pin = mapPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = offer.location.y - PIN_HEIGHT + 'px';
    pinImage.src = offer.author.avatar;
    pinImage.alt = offer.offer.title;

    return pin;
  };

  var fragment = document.createDocumentFragment();

  window.pin = {
    mapPinsContainer: mapPinsContainer,
    fragment: fragment,
    renderPin: renderPin
  };

})();
