'use strict';

var Z = { Model: {} };

Z.app = angular.module('munoa', ['ngRoute', 'ngTouch', 'ngSanitize']);

Z.app.value('apiHost', true ? 'http://pagoeta.illarra.com/v1' : 'http://pagoeta.zarautz.org/app_dev.php/v1');
Z.app.value('googleApiKey', 'AIzaSyBopLXCM1kLoklpwOOvyA_QurVbj1H02C0');

// We force early initialization by injecting the services
Z.app.run(['$timeout', 'phonegap', function ($timeout, phonegap) {
    phonegap.onDeviceReady().then(function () {
        $timeout(function () {
            navigator.splashscreen.hide();
        }, 1000);
    });
}]);
