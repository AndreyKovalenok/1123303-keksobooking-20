'use strict';

(function () {

  window.form.setAddressValue(false);
  window.form.disablingInputs();

  var successHandler = function (offers) {
    window.data.dataArray = offers;
    offers.forEach(function (offer, index) {
      var pin = window.pin.renderPin(offer);
      pin.addEventListener('click', function () {
        window.card.openCard(index);

        document.addEventListener('keydown', window.card.onCardEscPress);
      });
      pin.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          window.card.openCard(index);

          document.addEventListener('keydown', window.card.onCardEscPress);
        }
      });
      window.pin.fragment.appendChild(pin);
    });

    window.activationPage = function () {
      window.map.mapBlock.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');

      window.form.activationInputs();
      window.form.validateGuestsFiled();

      window.pin.mapPinsContainer.appendChild(window.pin.fragment.cloneNode(true));
      window.card.createCard(window.data.dataArray[0]);
      window.form.mapFilter.insertAdjacentElement('beforeBegin', window.card.template);

      window.card.closeButton.addEventListener('click', function () {
        window.card.closeCard();

        document.removeEventListener('keydown', window.card.onCardEscPress);
      });
      document.addEventListener('keydown', window.card.onCardEscPress);
    };
  };

  window.backend.load(successHandler);

})();


