'use strict';

(function () {
  var ANY_VALUE = 'any';

  var mapFilter = document.querySelector('.map__filters-container');
  var mapFilterInputs = mapFilter.querySelectorAll('input');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterTypeSelect = mapFilter.querySelector('select[name = "housing-type"]');
  var mapFilterPriceSelect = mapFilter.querySelector('select[name = "housing-price"]');
  var mapFilterRoomsSelect = mapFilter.querySelector('select[name = "housing-rooms"]');
  var mapFilterGuestsSelect = mapFilter.querySelector('select[name = "housing-guests"]');
  var mapFilterFeaturesInputs = mapFilter.querySelectorAll('input[name = "features"]');

  var sortParams = {
    type: ANY_VALUE,
    price: ANY_VALUE,
    rooms: ANY_VALUE,
    guests: ANY_VALUE,
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

  var resetForm = function () {
    mapFilterTypeSelect.value = ANY_VALUE;
    mapFilterPriceSelect.value = ANY_VALUE;
    mapFilterRoomsSelect.value = ANY_VALUE;
    mapFilterGuestsSelect.value = ANY_VALUE;

    mapFilterFeaturesInputs.forEach(function (input) {
      input.checked = false;
    });
  };

  var sortingArray = function () {
    var sortArray = window.dataArray.slice();

    if (sortParams.type !== ANY_VALUE) {
      sortArray = sortArray.filter(function (el) {
        return el.offer.type === sortParams.type;
      });
    }

    if (sortParams.price !== ANY_VALUE) {
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

    if (sortParams.rooms !== ANY_VALUE) {
      sortArray = sortArray.filter(function (el) {
        return el.offer.rooms === Number(sortParams.rooms);
      });
    }

    if (sortParams.guests !== ANY_VALUE) {
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

    window.pin.remove();

    var lim = sortArray.length > 5 ? 5 : sortArray.length;
    window.pin.render(sortArray, lim);
    window.pin.mount();

    window.card.close();

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
    node: mapFilter,
    activationInputs: activationMapInputs,
    disablingInputs: disablingMapInputs,
    resetForm: resetForm
  };
})();
