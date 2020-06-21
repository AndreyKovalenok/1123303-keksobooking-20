'use strict';

(function () {

  var announcementСardTemplate = document.querySelector('#card').content.querySelector('article');
  var announcementСardCloseBtn = announcementСardTemplate.querySelector('.popup__close');

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

  var openCard = function (index) {
    if (announcementСardTemplate.classList.contains('visually-hidden')) {
      announcementСardTemplate.classList.remove('visually-hidden');
    }
    createCard(window.data[index]);
  };

  var closeCard = function () {
    announcementСardTemplate.classList.add('visually-hidden');
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeCard();
    }

    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {
    template: announcementСardTemplate,
    closeButton: announcementСardCloseBtn,
    createCard: createCard,
    openCard: openCard,
    closeCard: closeCard,
    onCardEscPress: onCardEscPress
  };

})();
