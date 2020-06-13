'use strict';

var ANNOUNCEMENTS__COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapWidth = map.clientWidth;

var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

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
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        room: getRandomNumber(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT),
        guests: getRandomNumber(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT),
        checkin: TIMES[getRandomNumber(0, TIMES.length - 1)],
        checkout: TIMES[getRandomNumber(0, TIMES.length - 1)],
        features: FEATURES.slice().splice(getRandomNumber(0, FEATURES.length - 1)),
        description: 'Уютная квартира',
        photos: PHOTOS,
      },
      location: {
        x: getRandomNumber(0, mapWidth),
        y: getRandomNumber(MIN_PIN_Y_AXIS, MAX_PIN_Y_AXIS)
      }
    });
  }

  return objectsArray;
};

var renderPin = function (offer) {
  var pin = mapPinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');

  pin.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = offer.location.y - PIN_HEIGHT + 'px';
  pinImage.src = offer.author.avatar;
  pinImage.alt = offer.offer.title;

  return pin;
};

var dataArray = generateDefaultObjects(ANNOUNCEMENTS__COUNT);

var fragment = document.createDocumentFragment();
dataArray.forEach(function (offer) {
  fragment.appendChild(renderPin(offer));
});

document.querySelector('.map__pins').appendChild(fragment);
