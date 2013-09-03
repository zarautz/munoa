'use strict';

var Z = { Model: {} };

Z.app = angular.module('munoa', ['ngRoute', 'ngResource', 'ngTouch', 'ngSanitize']);

Z.app.value('apiHost', true ? 'http://pagoeta.illarra.com/v1' : 'http://pagoeta.zarautz.org/app_dev.php/v1');

Z.app.filter('translate', ['babel', function (babel) {
    return function (key) {
        return babel.translate(key);
    };
}]);

// We force early initialization by injecting the services
Z.app.run(['$timeout', 'phonegap', 'geolocation', function ($timeout, phonegap, geolocation) {
    phonegap.onDeviceReady().then(function () {
        $timeout(function () {
            navigator.splashscreen.hide();
        }, 1000);
    });
}]);
