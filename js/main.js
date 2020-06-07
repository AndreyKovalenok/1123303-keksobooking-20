'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapWidth = map.clientWidth;

var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateDefaultObjects = function () {
  var objectsArray = [];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var time = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  for (var i = 0; i < 8; i++) {
    objectsArray.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: 'Уютная квартира',
        address: '600, 350',
        price: getRandomNumber(1000, 5000),
        type: types[getRandomNumber(0, 3)],
        room: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: time[getRandomNumber(0, 2)],
        checkout: time[getRandomNumber(0, 2)],
        features: features.slice().splice(getRandomNumber(0, features.length - 1)),
        description: 'Уютная квартира',
        photos: photos,
      },
      location: {
        x: getRandomNumber(0, mapWidth),
        y: getRandomNumber(130, 630)
      }
    });
  }
  return objectsArray;
};

var dataArray = generateDefaultObjects();

var renderPin = function (offer) {
  var pin = mapPinTemplate.cloneNode(true);

  pin.style.left = offer.location.x + 10 + 'px';
  pin.style.top = offer.location.y + 20 + 'px';
  pin.querySelector('img').src = offer.author.avatar;
  pin.querySelector('img').alt = offer.offer.title;

  return pin;
};

var fragment = document.createDocumentFragment();
dataArray.forEach(function (offer) {
  fragment.appendChild(renderPin(offer));
});

document.querySelector('.map__pins').appendChild(fragment);
