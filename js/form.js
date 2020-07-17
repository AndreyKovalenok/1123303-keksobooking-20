'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelects = adForm.querySelectorAll('select');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');

  var adFormTitleInput = adForm.querySelector('input[name = "title"]');
  var adFormAddress = adForm.querySelector('input[name = "address"]');
  var adFormGuestsInput = adForm.querySelector('select[name = "capacity"]');
  var adFormRoomsInput = adForm.querySelector('select[name = "rooms"]');
  var adFormTypeSelect = adForm.querySelector('select[name = "type"]');
  var adFormPriceInput = adForm.querySelector('input[name = "price"]');
  var adFormTimeInSelect = adForm.querySelector('select[name = "timein"]');
  var adFormTimeOutSelect = adForm.querySelector('select[name = "timeout"]');
  var adFormDescriptionInput = adForm.querySelector('textarea[name = "description"]');

  var mapFilter = document.querySelector('.map__filters-container');
  var mapFilterInputs = mapFilter.querySelectorAll('input');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterTypeSelect = mapFilter.querySelector('select[name = "housing-type"]');

  var successTemplate = document.querySelector('#success').content.querySelector('div');
  var errorTemplate = document.querySelector('#error').content.querySelector('div');
  var errorButton = errorTemplate.querySelector('.error__button');

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var SHARP_END_PIN_HEIGHT = 22;

  var disablingInputs = function () {
    Array.from(adFormInputs).forEach(function (input) {
      input.disabled = true;
    });

    Array.from(mapFilterInputs).forEach(function (input) {
      input.disabled = true;
    });

    Array.from(adFormSelects).forEach(function (select) {
      select.disabled = true;
    });

    Array.from(mapFilterSelects).forEach(function (select) {
      select.disabled = true;
    });
  };

  var resetForm = function () {
    adFormTitleInput.value = '';
    adFormTypeSelect.value = 'flat';
    adFormPriceInput.value = '';
    adFormTimeInSelect.value = '12:00';
    adFormTimeOutSelect.value = '12:00';
    adFormRoomsInput.value = '1';
    adFormGuestsInput.value = '3';
    adFormDescriptionInput.value = '';
  };

  var activationInputs = function () {
    Array.from(adFormInputs).forEach(function (input) {
      input.disabled = false;
    });

    Array.from(adFormSelects).forEach(function (select) {
      select.disabled = false;
    });
  };

  var activationSortInputs = function () {
    Array.from(mapFilterInputs).forEach(function (input) {
      input.disabled = false;
    });

    Array.from(mapFilterSelects).forEach(function (select) {
      select.disabled = false;
    });
  };

  var setAddressValue = function (isActivePage) {
    adFormAddress.value = isActivePage
      ? (parseInt(window.map.mapPin.style.left, 10) + MAIN_PIN_WIDTH / 2) + ', ' + (parseInt(window.map.mapPin.style.top, 10) + MAIN_PIN_HEIGHT + SHARP_END_PIN_HEIGHT)
      : (parseInt(window.map.mapPin.style.left, 10) + MAIN_PIN_WIDTH / 2) + ', ' + (parseInt(window.map.mapPin.style.top, 10) + MAIN_PIN_HEIGHT / 2);
  };

  var validateGuestsFiled = function () {
    var validationMessage = '';
    var roomsFieldValue = adFormRoomsInput.value;
    var guestsFiledValue = adFormGuestsInput.value;

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

  var validateFormPrice = function () {
    var validationMessage = '';
    var typeFieldValue = adFormTypeSelect.value;

    switch (typeFieldValue) {
      case 'bungalo':
        adFormPriceInput.min = 0;
        adFormPriceInput.placeholder = 0;
        break;

      case 'flat':
        adFormPriceInput.min = 1000;
        adFormPriceInput.placeholder = 1000;
        validationMessage = 'Минимальная цена - 1000';
        break;

      case 'house':
        adFormPriceInput.min = 5000;
        adFormPriceInput.placeholder = 5000;
        validationMessage = 'Минимальная цена - 5000';
        break;

      case 'palace':
        adFormPriceInput.min = 10000;
        adFormPriceInput.placeholder = 10000;
        validationMessage = 'Минимальная цена - 10000';
        break;

      default:
        validationMessage = '';
        break;
    }

    adFormPriceInput.setCustomValidity(validationMessage);
  };

  adFormGuestsInput.addEventListener('input', function () {
    validateGuestsFiled(adFormGuestsInput.value, adFormRoomsInput.value);
  });

  adFormRoomsInput.addEventListener('input', function () {
    validateGuestsFiled(adFormGuestsInput.value, adFormRoomsInput.value);
  });

  adFormTypeSelect.addEventListener('input', function () {
    validateFormPrice();
  });

  adFormTimeOutSelect.addEventListener('input', function () {
    adFormTimeInSelect.value = adFormTimeOutSelect.value;
  });

  adFormTimeInSelect.addEventListener('input', function () {
    adFormTimeOutSelect.value = adFormTimeInSelect.value;
  });

  mapFilterTypeSelect.addEventListener('input', function () {
    var sortedArray = mapFilterTypeSelect.value !== 'any'
      ? window.dataArray.filter(function (el) {
        return el.offer.type === mapFilterTypeSelect.value;
      })
      : window.dataArray;

    window.pin.removePins();

    var lim = sortedArray.length > 5 ? 5 : sortedArray.length;
    window.pin.renderPins(sortedArray, lim);
    window.pin.mounPins();

    window.card.closeCard();
  });

  var successEscKeyDownHandler = function (evt) {
    if (evt.keyCode === 27) {
      successTemplate.remove();

      document.removeEventListener('keydown', successEscKeyDownHandler);
    }
  };

  var errorEscKeyDownHandler = function (evt) {
    if (evt.keyCode === 27) {
      errorTemplate.remove();

      document.removeEventListener('keydown', errorEscKeyDownHandler);
    }
  };

  var successClickHandler = function () {
    successTemplate.remove();
  };

  var errorClickHandler = function () {
    errorTemplate.remove();
  };

  var errorHandler = function () {
    var main = document.querySelector('main');
    main.insertAdjacentElement('afterbegin', errorTemplate);

    document.addEventListener('keydown', errorEscKeyDownHandler);
    errorButton.addEventListener('click', errorClickHandler);
  };

  var submitHandler = function (evt) {
    window.backend.save(new FormData(adForm), function () {
      window.map.mapBlock.classList.add('map--faded');
      window.form.adForm.classList.add('ad-form--disabled');

      disablingInputs();
      resetForm();

      window.pin.removePins();
      window.map.mapPin.addEventListener('mousedown', window.map.pinClickHandler);
      window.map.mapPin.addEventListener('keydown', window.map.pinKeyDownHandler);

      window.pin.renderPins(window.dataArray, window.announcementsCount);

      var card = document.querySelector('.map__card');
      card.remove();

      document.body.insertAdjacentElement('afterbegin', successTemplate);
      successTemplate.addEventListener('click', successClickHandler);
      document.addEventListener('keydown', successEscKeyDownHandler);
    }, errorHandler);
    evt.preventDefault();
  };

  adForm.addEventListener('submit', submitHandler);
  adFormResetButton.addEventListener('click', resetForm);

  window.form = {
    adForm: adForm,
    mapFilter: mapFilter,
    setAddressValue: setAddressValue,
    activationInputs: activationInputs,
    activationSortInputs: activationSortInputs,
    disablingInputs: disablingInputs,
    validateGuestsFiled: validateGuestsFiled,
    adFormGuestsInput: adFormGuestsInput,
    adFormRoomsInput: adFormRoomsInput,
    adFormAddress: adFormAddress
  };

})();
