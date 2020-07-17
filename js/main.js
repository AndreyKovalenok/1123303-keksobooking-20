'use strict';

(function () {

  var ANNOUNCEMENTS__COUNT = 5;
  window.announcementsCount = ANNOUNCEMENTS__COUNT;

  window.form.setAddressValue(false);
  window.form.disablingInputs();

  var successHandler = function (offers) {
    window.form.activationSortInputs();
    window.dataArray = offers;

    window.pin.renderPins(offers, window.announcementsCount);
  };

  var errorHandler = function (error) {
    throw new Error(error);
  };

  window.activationPage = function () {
    window.map.mapBlock.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    window.form.activationInputs();
    window.form.validateGuestsFiled();

    window.pin.mounPins();
    window.card.createCard(window.dataArray[0]);
    window.form.mapFilter.insertAdjacentElement('beforeBegin', window.card.template);

    window.card.closeButton.addEventListener('click', function () {
      window.card.closeCard();

      document.removeEventListener('keydown', window.card.cardEscPressHandler);
    });
    document.addEventListener('keydown', window.card.cardEscPressHandler);
  };

  window.backend.load(successHandler, errorHandler);

})();


