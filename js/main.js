'use strict';

(function () {

  var ANNOUNCEMENTS_COUNT = 5;
  window.announcementsCount = ANNOUNCEMENTS_COUNT;

  window.mapFilter.disablingInputs();
  window.form.setAddressValue(false);
  window.form.disablingInputs();

  var successHandler = function (offers) {
    window.dataArray = offers;

    window.pin.render(offers, window.announcementsCount);
  };

  var errorHandler = function (error) {
    throw new Error(error);
  };

  window.activationPage = function () {
    window.map.node.classList.remove('map--faded');
    window.form.node.classList.remove('ad-form--disabled');

    window.mapFilter.activationInputs();
    window.form.activationInputs();
    window.form.validateGuestsFiled();

    window.pin.mount();
    window.card.create(window.dataArray[0]);
    window.card.close();
    window.mapFilter.node.insertAdjacentElement('beforeBegin', window.card.template);

    window.card.closeButton.addEventListener('click', function () {
      window.card.close();

      document.removeEventListener('keydown', window.card.cardEscPressHandler);
    });
    document.addEventListener('keydown', window.card.cardEscPressHandler);
  };

  window.backend.load(successHandler, errorHandler);

})();


