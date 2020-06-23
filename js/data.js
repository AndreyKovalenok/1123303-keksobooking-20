'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapWidth = map.clientWidth;

  var ANNOUNCEMENTS__COUNT = 8;

  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 5000;
  var MIN_ROOMS_COUNT = 1;
  var MAX_ROOMS_COUNT = 5;
  var MIN_GUESTS_COUNT = 1;
  var MAX_GUESTS_COUNT = 5;
  var MIN_PIN_Y_AXIS = 130;
  var MAX_PIN_Y_AXIS = 630;

  var generateDefaultObjects = function (objectsCount) {
    var objectsArray = [];

    for (var i = 0; i < objectsCount; i++) {
      objectsArray.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },
        offer: {
          title: 'Уютная квартира',
          address: '600, 350',
          price: window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
          type: TYPES[window.utils.getRandomNumber(0, TYPES.length - 1)],
          room: window.utils.getRandomNumber(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT),
          guests: window.utils.getRandomNumber(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT),
          checkin: TIMES[window.utils.getRandomNumber(0, TIMES.length - 1)],
          checkout: TIMES[window.utils.getRandomNumber(0, TIMES.length - 1)],
          features: FEATURES.slice().splice(window.utils.getRandomNumber(0, FEATURES.length - 1)),
          description: 'Уютная квартира',
          photos: PHOTOS,
        },
        location: {
          x: window.utils.getRandomNumber(0, mapWidth),
          y: window.utils.getRandomNumber(MIN_PIN_Y_AXIS, MAX_PIN_Y_AXIS)
        }
      });
    }

    return objectsArray;
  };

  window.data = {
    dataArray: generateDefaultObjects(ANNOUNCEMENTS__COUNT)
  };

})();
