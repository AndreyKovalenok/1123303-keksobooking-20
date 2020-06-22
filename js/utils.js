'use strict';

(function () {

  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  };

})();

