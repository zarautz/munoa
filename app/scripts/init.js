'use strict';

var Z = {};

// Create the Angular app
Z.app = angular.module('zarautz', ['ngResource', 'ngMobile']);

Z.app.value('host', true ? 'http://pagoeta.zarautz.org/app_dev.php/v1' : 'http://data.zarautz.org');

Z.app.filter('translate', ['babel', function (babel) {
    return function (key) {
        return babel.translate(key);
    }
}]);
