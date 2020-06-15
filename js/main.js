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

var mapFilter = map.querySelector('.map__filters-container');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPinsContainer = document.querySelector('.map__pins');

var announcementСardTemplate = document.querySelector('#card').content.querySelector('article');

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

var createCard = function (offerData) {
  var announcement = announcementСardTemplate.cloneNode(true);
  var announcementTitle = announcement.querySelector('.popup__title');
  var announcementAddress = announcement.querySelector('.popup__text--address');
  var announcementPrice = announcement.querySelector('.popup__text--price');
  var announcementType = announcement.querySelector('.popup__type');
  var announcementRooms = announcement.querySelector('.popup__text--capacity');
  var announcementTime = announcement.querySelector('.popup__text--time');
  var announcementFeatures = announcement.querySelector('.popup__features');
  var announcementDesctiption = announcement.querySelector('.popup__description');
  var announcementPhotos = announcement.querySelector('.popup__photos');
  var announcementPhoto = announcement.querySelector('.popup__photo');
  var announcementAvatar = announcement.querySelector('.popup__avatar');

  announcementTitle.textContent = offerData.offer.title || '';
  announcementAddress.textContent = offerData.offer.address || '';
  announcementPrice.textContent = offerData.offer.price || '';
  announcementRooms.textContent = (offerData.offer.room + ' комнаты для ' + offerData.offer.guests + ' гостей') || '';
  announcementTime.textContent = ('Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout) || '';
  announcementFeatures.textContent = offerData.offer.features || '';
  announcementDesctiption.textContent = offerData.offer.description || '';
  announcementAvatar.src = offerData.author.avatar;

  switch (offerData.offer.type) {
    case 'flat':
      announcementType.textContent = 'Квартира';
      break;
    case 'bungalo':
      announcementType.textContent = 'Бунгало';
      break;
    case 'house':
      announcementType.textContent = 'Дом';
      break;
    case 'palace':
      announcementType.textContent = 'Дворец';
      break;
    default:
      announcementType.textContent = '';
  }

  offerData.offer.photos.forEach(function (item, index) {
    if (index === 0) {
      announcementPhoto.src = item;
      announcementPhotos.appendChild(announcementPhoto);
    } else {
      var image = announcementPhoto.cloneNode(true);
      image.src = item;
      announcementPhotos.appendChild(image);
    }
  });

  return announcement;
};

var dataArray = generateDefaultObjects(ANNOUNCEMENTS__COUNT);

var fragment = document.createDocumentFragment();
dataArray.forEach(function (offer) {
  fragment.appendChild(renderPin(offer));
});

mapPinsContainer.appendChild(fragment);
mapFilter.insertAdjacentElement('beforeBegin', createCard(dataArray[0]));
