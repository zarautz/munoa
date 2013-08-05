'use strict';

var Z = {};

Z.app = angular.module('munoa', ['ngResource', 'ngMobile', 'ngSanitize']);

Z.app.value('apiHost', true ? 'http://pagoeta.illarra.com/v1' : 'http://pagoeta.zarautz.org/app_dev.php/v1');

Z.app.filter('translate', ['babel', function (babel) {
    return function (key) {
        return babel.translate(key);
    };
}]);
