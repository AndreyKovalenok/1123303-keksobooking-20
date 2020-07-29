'use strict';

(function () {

  var TYPES = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var announcementСardTemplate = document.querySelector('#card').content.querySelector('article');
  var announcementСardCloseBtn = announcementСardTemplate.querySelector('.popup__close');
  var announcementPhoto = announcementСardTemplate.querySelector('.popup__photo');
  var announcementTitle = announcementСardTemplate.querySelector('.popup__title');
  var announcementAddress = announcementСardTemplate.querySelector('.popup__text--address');
  var announcementPrice = announcementСardTemplate.querySelector('.popup__text--price');
  var announcementType = announcementСardTemplate.querySelector('.popup__type');
  var announcementRooms = announcementСardTemplate.querySelector('.popup__text--capacity');
  var announcementTime = announcementСardTemplate.querySelector('.popup__text--time');
  var announcementFeatures = announcementСardTemplate.querySelector('.popup__features');
  var announcementDesctiption = announcementСardTemplate.querySelector('.popup__description');
  var announcementPhotos = announcementСardTemplate.querySelector('.popup__photos');
  var announcementAvatar = announcementСardTemplate.querySelector('.popup__avatar');

  var createCard = function (offerData) {
    announcementTitle.textContent = offerData.offer.title || '';
    announcementAddress.textContent = offerData.offer.address || '';
    announcementPrice.textContent = offerData.offer.price || '';
    announcementRooms.textContent = (offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей') || '';
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
    announcementType.textContent = TYPES[offerData.offer.type];

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

  var openCard = function (data, index) {
    if (announcementСardTemplate.classList.contains('visually-hidden')) {
      announcementСardTemplate.classList.remove('visually-hidden');
    }
    createCard(data[index]);
  };

  var closeCard = function () {
    announcementСardTemplate.classList.add('visually-hidden');
  };

  var cardEscPressHandler = function (evt) {
    if (evt.keyCode === 27) {
      closeCard();
    }

    document.removeEventListener('keydown', cardEscPressHandler);
  };

  window.card = {
    template: announcementСardTemplate,
    closeButton: announcementСardCloseBtn,
    create: createCard,
    open: openCard,
    close: closeCard,
    cardEscPressHandler: cardEscPressHandler
  };

})();
