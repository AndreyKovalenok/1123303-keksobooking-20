'use strict';

(function () {

  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 62;
  var SHARP_END_PIN_HEIGHT = 22;

  var minPriceForType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelects = adForm.querySelectorAll('select');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');

  var adFormTitleInput = adForm.querySelector('input[name = "title"]');
  var adFormAddress = adForm.querySelector('input[name = "address"]');
  var adFormGuestsInput = adForm.querySelector('select[name = "capacity"]');
  var adFormGuestsOptions = adFormGuestsInput.querySelectorAll('option');
  var adFormRoomsInput = adForm.querySelector('select[name = "rooms"]');
  var adFormTypeSelect = adForm.querySelector('select[name = "type"]');
  var adFormPriceInput = adForm.querySelector('input[name = "price"]');
  var adFormTimeInSelect = adForm.querySelector('select[name = "timein"]');
  var adFormTimeOutSelect = adForm.querySelector('select[name = "timeout"]');
  var adFormDescriptionInput = adForm.querySelector('textarea[name = "description"]');
  var adFormCheckboxInputs = adForm.querySelectorAll('input[type = "checkbox"]');

  var successTemplate = document.querySelector('#success').content.querySelector('div');
  var errorTemplate = document.querySelector('#error').content.querySelector('div');
  var errorButton = errorTemplate.querySelector('.error__button');

  adFormGuestsOptions[2].selected = true;

  var disablingInputs = function () {
    Array.from(adFormInputs).forEach(function (input) {
      input.disabled = true;
    });


    Array.from(adFormSelects).forEach(function (select) {
      select.disabled = true;
    });

    adFormDescriptionInput.disabled = true;
    adFormSubmitButton.disabled = true;
    adFormResetButton.disabled = true;
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
    adFormCheckboxInputs.forEach(function (input) {
      input.checked = false;
    });
  };

  var disablingPage = function () {
    window.map.node.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    disablingInputs();
    resetForm();
    window.mapFilter.disablingInputs();
    window.mapFilter.resetForm();

    window.pin.remove();
    window.map.pin.addEventListener('mousedown', window.map.pinClickHandler);
    window.map.pin.addEventListener('keydown', window.map.pinKeyDownHandler);

    window.pin.render(window.dataArray, window.announcementsCount);

    var card = document.querySelector('.map__card');
    card.remove();

    var left = window.map.node.offsetWidth / 2 - MAIN_PIN_WIDTH / 2;
    var top = window.map.node.offsetHeight / 2;
    window.map.pin.style.left = left + 'px';
    window.map.pin.style.top = top + 'px';
    adFormAddress.value = (left + MAIN_PIN_WIDTH / 2) + ', ' + (top + MAIN_PIN_HEIGHT / 2);

    window.avatar.preview.src = 'img/muffin-grey.svg';
    window.avatar.housingPreview.innerHTML = '';
  };

  var activationInputs = function () {
    Array.from(adFormInputs).forEach(function (input) {
      input.disabled = false;
    });

    Array.from(adFormSelects).forEach(function (select) {
      select.disabled = false;
    });

    adFormDescriptionInput.disabled = false;
    adFormSubmitButton.disabled = false;
    adFormResetButton.disabled = false;
  };

  var setAddressValue = function (isActivePage) {
    var calculateAddress = function () {
      if (isActivePage) {
        return (parseInt(window.map.pin.style.left, 10) + MAIN_PIN_WIDTH / 2) + ', ' + (parseInt(window.map.pin.style.top, 10) + MAIN_PIN_HEIGHT + SHARP_END_PIN_HEIGHT);
      }
      return (parseInt(window.map.pin.style.left, 10) + MAIN_PIN_WIDTH / 2) + ', ' + (parseInt(window.map.pin.style.top, 10) + MAIN_PIN_HEIGHT / 2);
    };

    adFormAddress.value = calculateAddress();
  };

  var validateGuestsFiled = function () {
    var validationMessage = '';
    var roomsFieldValue = adFormRoomsInput.value;

    var disablingOptions = function () {
      adFormGuestsOptions.forEach(function (option) {
        option.disabled = true;
      });

      for (var i = 0, len = arguments.length; i < len; i++) {
        adFormGuestsOptions[arguments[i]].disabled = false;
      }

      if (adFormGuestsInput.value !== '0' && roomsFieldValue === '100') {
        validationMessage = 'Выбранный тип жилья предназначен не для гостей';
      }

      if (adFormGuestsInput.value > roomsFieldValue) {
        validationMessage = 'Гостей должно быть не более ' + roomsFieldValue;
      }
    };

    switch (roomsFieldValue) {
      case '1':
        disablingOptions(2);
        break;

      case '2':
        disablingOptions(1, 2);
        break;

      case '3':
        disablingOptions(0, 1, 2);
        break;

      case '100':
        disablingOptions(3);
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

    var setPriceInputParameters = function (minValue, message) {
      adFormPriceInput.min = minValue;
      adFormPriceInput.placeholder = minValue;
      validationMessage = message;
    };

    var minPrice = minPriceForType[typeFieldValue];
    setPriceInputParameters(minPrice, 'Минимальная цена - ' + minPrice);
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
      disablingPage();

      document.body.insertAdjacentElement('afterbegin', successTemplate);
      successTemplate.addEventListener('click', successClickHandler);
      document.addEventListener('keydown', successEscKeyDownHandler);
    }, errorHandler);
    evt.preventDefault();
  };

  adForm.addEventListener('submit', submitHandler);
  adFormResetButton.addEventListener('click', disablingPage);

  window.form = {
    node: adForm,
    setAddressValue: setAddressValue,
    activationInputs: activationInputs,
    disablingInputs: disablingInputs,
    validateGuestsFiled: validateGuestsFiled,
    address: adFormAddress
  };

})();
