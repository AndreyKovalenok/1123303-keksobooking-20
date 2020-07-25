'use strict';

(function () {
  var SOMETHING_VALUE = 'any';

  var mapFilter = document.querySelector('.map__filters-container');
  var mapFilterInputs = mapFilter.querySelectorAll('input');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterTypeSelect = mapFilter.querySelector('select[name = "housing-type"]');
  var mapFilterPriceSelect = mapFilter.querySelector('select[name = "housing-price"]');
  var mapFilterRoomsSelect = mapFilter.querySelector('select[name = "housing-rooms"]');
  var mapFilterGuestsSelect = mapFilter.querySelector('select[name = "housing-guests"]');
  var mapFilterFeaturesInputs = mapFilter.querySelectorAll('input[name = "features"]');

  var sortParams = {
    type: SOMETHING_VALUE,
    price: SOMETHING_VALUE,
    rooms: SOMETHING_VALUE,
    guests: SOMETHING_VALUE,
    features: []
  };

  var activationMapInputs = function () {
    Array.from(mapFilterInputs).forEach(function (input) {
      input.disabled = false;
    });

    Array.from(mapFilterSelects).forEach(function (select) {
      select.disabled = false;
    });
  };

  var disablingMapInputs = function () {
    Array.from(mapFilterInputs).forEach(function (input) {
      input.disabled = true;
    });
    Array.from(mapFilterSelects).forEach(function (select) {
      select.disabled = true;
    });
  };

  var sortingArray = function () {
    var sortArray = window.dataArray.slice();

    if (sortParams.type !== SOMETHING_VALUE) {
      sortArray = sortArray.filter(function (el) {
        return el.offer.type === sortParams.type;
      });
    }

    if (sortParams.price !== SOMETHING_VALUE) {
      switch (sortParams.price) {
        case 'low':
          sortArray = sortArray.filter(function (el) {
            return el.offer.price < 10000;
          });
          break;
        case 'middle':
          sortArray = sortArray.filter(function (el) {
            return el.offer.price >= 10000 && el.offer.price < 50000;
          });
          break;
        case 'high':
          sortArray = sortArray.filter(function (el) {
            return el.offer.price >= 50000;
          });
          break;
        default: break;
      }
    }

    if (sortParams.rooms !== SOMETHING_VALUE) {
      sortArray = sortArray.filter(function (el) {
        return el.offer.rooms === Number(sortParams.rooms);
      });
    }

    if (sortParams.guests !== SOMETHING_VALUE) {
      sortArray = sortArray.filter(function (el) {
        return el.offer.guests === Number(sortParams.guests);
      });
    }

    if (sortParams.features.length) {
      sortArray = sortArray.filter(function (el) {
        var isInclude = true;

        sortParams.features.forEach(function (feature) {
          if (!el.offer.features.includes(feature)) {
            isInclude = false;
          }
        });

        return isInclude;
      });
    }

    window.pin.removePins();

    var lim = sortArray.length > 5 ? 5 : sortArray.length;
    window.pin.renderPins(sortArray, lim);
    window.pin.mounPins();

    window.card.closeCard();

    return sortArray;
  };

  mapFilterTypeSelect.addEventListener('input', window.debounce(function () {
    sortParams.type = mapFilterTypeSelect.value;
    sortingArray();
  }));

  mapFilterPriceSelect.addEventListener('input', window.debounce(function () {
    sortParams.price = mapFilterPriceSelect.value;
    sortingArray();
  }));

  mapFilterRoomsSelect.addEventListener('input', window.debounce(function () {
    sortParams.rooms = mapFilterRoomsSelect.value;
    sortingArray();
  }));

  mapFilterGuestsSelect.addEventListener('input', window.debounce(function () {
    sortParams.guests = mapFilterGuestsSelect.value;
    sortingArray();
  }));

  Array.from(mapFilterFeaturesInputs).forEach(function (input) {
    input.addEventListener('change', window.debounce(function () {
      if (!sortParams.features.includes(input.value)) {
        sortParams.features.push(input.value);
      } else {
        sortParams.features = sortParams.features.filter(function (el) {
          return el !== input.value;
        });
      }
      sortingArray();
    }));
  });

  window.mapFilter = {
    mapFilter: mapFilter,
    mapFilterInputs: mapFilterInputs,
    mapFilterSelects: mapFilterSelects,
    activationMapInputs: activationMapInputs,
    disablingMapInputs: disablingMapInputs
  };
})();
