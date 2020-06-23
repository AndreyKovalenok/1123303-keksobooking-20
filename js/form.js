'use strict';

(function () {

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

  var mapFilter = document.querySelector('.map__filters-container');
  var mapFilterInputs = mapFilter.querySelectorAll('input');
  var mapFilterSelects = mapFilter.querySelectorAll('select');

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var SHARP_END_PIN_HEIGHT = 22;

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

  window.form = {
    adForm: adForm,
    mapFilter: mapFilter,
    setAddressValue: setAddressValue,
    activationInputs: activationInputs,
    disablingInputs: disablingInputs,
    validateGuestsFiled: validateGuestsFiled,
    adFormGuestsInput: adFormGuestsInput,
    adFormRoomsInput: adFormRoomsInput
  };

})();
