'use strict';

var ANNOUNCEMENTS__COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 62;
var SHARP_END_PIN_HEIGHT = 22;
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
var mapPin = map.querySelector('.map__pin--main');
var mapWidth = map.clientWidth;

var mapFilter = map.querySelector('.map__filters-container');
var mapFilterInputs = mapFilter.querySelectorAll('input');
var mapFilterSelects = mapFilter.querySelectorAll('select');

var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapPinsContainer = document.querySelector('.map__pins');

var announcementСardTemplate = document.querySelector('#card').content.querySelector('article');
var announcementСardCloseBtn = announcementСardTemplate.querySelector('.popup__close');

var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input');
var adFormSelects = adForm.querySelectorAll('select');
var adFormAddress = adForm.querySelector('input[name = "address"]');
var adFormGuestsInput = adForm.querySelector('select[name = "capacity"]');
var adFormRoomsInput = adForm.querySelector('select[name = "rooms"]');
var adFormTypeSelect = adForm.querySelector('select[name = "type"]');
var adFormPriceInput = adForm.querySelector('input[name = "price"]');
var adFormTimeInSelect = adForm.querySelector('select[name = "timein"]');
var adFormTimeOutSelect = adForm.querySelector('select[name = "timeout"]');

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
  var announcementTitle = announcementСardTemplate.querySelector('.popup__title');
  var announcementAddress = announcementСardTemplate.querySelector('.popup__text--address');
  var announcementPrice = announcementСardTemplate.querySelector('.popup__text--price');
  var announcementType = announcementСardTemplate.querySelector('.popup__type');
  var announcementRooms = announcementСardTemplate.querySelector('.popup__text--capacity');
  var announcementTime = announcementСardTemplate.querySelector('.popup__text--time');
  var announcementFeatures = announcementСardTemplate.querySelector('.popup__features');
  var announcementDesctiption = announcementСardTemplate.querySelector('.popup__description');
  var announcementPhotos = announcementСardTemplate.querySelector('.popup__photos');
  var announcementPhoto = announcementСardTemplate.querySelector('.popup__photo');
  var announcementAvatar = announcementСardTemplate.querySelector('.popup__avatar');

  announcementTitle.textContent = offerData.offer.title || '';
  announcementAddress.textContent = offerData.offer.address || '';
  announcementPrice.textContent = offerData.offer.price || '';
  announcementRooms.textContent = (offerData.offer.room + ' комнаты для ' + offerData.offer.guests + ' гостей') || '';
  announcementTime.textContent = ('Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout) || '';
  announcementDesctiption.textContent = offerData.offer.description || '';
  announcementAvatar.src = offerData.author.avatar;

  var featuresFragment = document.createDocumentFragment();
  offerData.offer.features.forEach(function (item) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + item);
    featuresFragment.appendChild(featureItem);
  });
  announcementFeatures.innerHTML = '';
  announcementFeatures.appendChild(featuresFragment);

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

  announcementPhotos.innerHTML = '';
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
};

var disablingInputs = function () {
  for (var input in adFormInputs) {
    if (adFormInputs.hasOwnProperty(input)) {
      adFormInputs[input].disabled = true;
    }
  }

  for (var select in adFormSelects) {
    if (adFormSelects.hasOwnProperty(select)) {
      adFormSelects[select].disabled = true;
    }
  }

  for (input in mapFilterInputs) {
    if (mapFilterInputs.hasOwnProperty(input)) {
      mapFilterInputs[input].disabled = true;
    }
  }

  for (select in mapFilterSelects) {
    if (mapFilterSelects.hasOwnProperty(select)) {
      mapFilterSelects[select].disabled = true;
    }
  }
};

var activationInputs = function () {
  for (var input in adFormInputs) {
    if (adFormInputs.hasOwnProperty(input)) {
      adFormInputs[input].disabled = false;
    }
  }

  for (var select in adFormSelects) {
    if (adFormSelects.hasOwnProperty(select)) {
      adFormSelects[select].disabled = false;
    }
  }

  for (input in mapFilterInputs) {
    if (mapFilterInputs.hasOwnProperty(input)) {
      mapFilterInputs[input].disabled = false;
    }
  }

  for (select in mapFilterSelects) {
    if (mapFilterSelects.hasOwnProperty(select)) {
      mapFilterSelects[select].disabled = false;
    }
  }
};

var setAddressValue = function (isActivePage) {
  adFormAddress.value = isActivePage
    ? (parseInt(mapPin.style.left, 10) + MAIN_PIN_WIDTH / 2) + ', ' + (parseInt(mapPin.style.top, 10) + MAIN_PIN_HEIGHT + SHARP_END_PIN_HEIGHT)
    : (parseInt(mapPin.style.left, 10) + MAIN_PIN_WIDTH / 2) + ', ' + (parseInt(mapPin.style.top, 10) + MAIN_PIN_HEIGHT / 2);
};

setAddressValue(false);
disablingInputs();

var dataArray = generateDefaultObjects(ANNOUNCEMENTS__COUNT);

var openCard = function (index) {
  if (announcementСardTemplate.classList.contains('visually-hidden')) {
    announcementСardTemplate.classList.remove('visually-hidden');
  }
  createCard(dataArray[index]);
};

var closeCard = function () {
  announcementСardTemplate.classList.add('visually-hidden');
};

var fragment = document.createDocumentFragment();
dataArray.forEach(function (offer, index) {
  var pin = renderPin(offer);
  pin.addEventListener('click', function () {
    openCard(index);

    document.addEventListener('keydown', onCardEscPress);
  });
  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      openCard(index);

      document.addEventListener('keydown', onCardEscPress);
    }
  });
  fragment.appendChild(pin);
});

var onCardEscPress = function (evt) {
  if (evt.keyCode === 27) {
    closeCard();
  }

  document.removeEventListener('keydown', onCardEscPress);
};

var activationPage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activationInputs();
  validateGuestsFiled(adFormGuestsInput.value, adFormRoomsInput.value);

  mapPinsContainer.appendChild(fragment);

  createCard(dataArray[0]);
  mapFilter.insertAdjacentElement('beforeBegin', announcementСardTemplate);
  announcementСardCloseBtn.addEventListener('click', function () {
    closeCard();

    document.removeEventListener('keydown', onCardEscPress);
  });
  document.addEventListener('keydown', onCardEscPress);
};

mapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activationPage();
    setAddressValue(true);
  }
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activationPage();
    setAddressValue(true);
  }
});

var validateGuestsFiled = function (guestsFiledValue, roomsFieldValue) {
  var validationMessage = '';

  switch (roomsFieldValue) {
    case '1':
      if (guestsFiledValue !== '1') {
        validationMessage = 'Можно разместить только одного гостя';
      } else {
        validationMessage = '';
      }
      break;

    case '2':
      if (guestsFiledValue !== '2' && guestsFiledValue !== '1') {
        validationMessage = 'Можно разместить одного или двух гостей';
      } else {
        validationMessage = '';
      }
      break;

    case '3':
      if (guestsFiledValue === '0') {
        validationMessage = 'Можно разместить одного, двух или трех гостей';
      } else {
        validationMessage = '';
      }
      break;

    case '100':
      if (guestsFiledValue !== '0') {
        validationMessage = 'Нельзя размещать гостей';
      } else {
        validationMessage = '';
      }
      break;

    default:
      validationMessage = '';
      break;
  }

  adFormGuestsInput.setCustomValidity(validationMessage);
};

adFormGuestsInput.addEventListener('input', function () {
  validateGuestsFiled(adFormGuestsInput.value, adFormRoomsInput.value);
});
adFormRoomsInput.addEventListener('input', function () {
  validateGuestsFiled(adFormGuestsInput.value, adFormRoomsInput.value);
});

adFormTypeSelect.addEventListener('input', function () {
  validateFormPrice(adFormTypeSelect.value, adFormPriceInput);
});

var validateFormPrice = function (typeFieldValue, priceField) {
  var validationMessage = '';

  switch (typeFieldValue) {
    case 'bungalo':
      priceField.min = 0;
      priceField.placeholder = 0;
      break;

    case 'flat':
      priceField.min = 1000;
      priceField.placeholder = 1000;
      validationMessage = 'Минимальная цена - 1000';
      break;

    case 'house':
      priceField.min = 5000;
      priceField.placeholder = 5000;
      validationMessage = 'Минимальная цена - 5000';
      break;

    case 'palace':
      priceField.min = 10000;
      priceField.placeholder = 10000;
      validationMessage = 'Минимальная цена - 10000';
      break;

    default:
      validationMessage = '';
      break;
  }

  priceField.setCustomValidity(validationMessage);
};

adFormTimeOutSelect.addEventListener('input', function () {
  adFormTimeInSelect.value = adFormTimeOutSelect.value;
});

adFormTimeInSelect.addEventListener('input', function () {
  adFormTimeOutSelect.value = adFormTimeInSelect.value;
});
