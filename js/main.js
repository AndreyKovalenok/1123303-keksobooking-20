'use strict';

(function () {

  window.form.setAddressValue(false);
  window.form.disablingInputs();

  var successHandler = function (offers) {
    window.form.activationSortInputs();
    window.data.dataArray = offers;

    window.pin.renderPins(offers, window.data.announcementsCount);
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
    window.card.createCard(window.data.dataArray[0]);
    window.form.mapFilter.insertAdjacentElement('beforeBegin', window.card.template);

    window.card.closeButton.addEventListener('click', function () {
      window.card.closeCard();

      document.removeEventListener('keydown', window.card.cardEscPressHandler);
    });
    document.addEventListener('keydown', window.card.cardEscPressHandler);
  };

  window.backend.load(successHandler, errorHandler);

})();


