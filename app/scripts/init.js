'use strict';

var Z = {};

Z.app = angular.module('munoa', ['ngResource', 'ngMobile']);

Z.app.value('apiHost', true ? 'http://pagoeta.zarautz.org/app_dev.php/v1' : 'http://local.data.zarautz.org');

Z.app.filter('translate', ['babel', function (babel) {
    return function (key) {
        return babel.translate(key);
    };
}]);
