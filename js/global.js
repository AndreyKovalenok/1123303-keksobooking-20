'use strict';

(function () {

  window.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

})();
