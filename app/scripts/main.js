'use strict';

var Z = { Model: {} };

Z.app = angular.module('munoa', ['ngRoute', 'ngTouch', 'ngSanitize']);

Z.app.value('apiHost', true ? 'http://pagoeta.illarra.com/v1' : 'http://pagoeta.zarautz.org/app_dev.php/v1');
Z.app.value('googleApiKey', 'AIzaSyBopLXCM1kLoklpwOOvyA_QurVbj1H02C0');

// We force early initialization by injecting the services
Z.app.run(['$rootScope', '$timeout', 'navigation', 'phonegap', function ($rootScope, $timeout, navigation, phonegap) {
    // Make navigation accesible by all the scopes
    $rootScope.navigation = navigation;

    phonegap.onDeviceReady().then(function () {
        // Back Button
        document.addEventListener('backbutton', function () {
            $rootScope.$apply(function () {
                if (navigation.activeView > 1) {
                    navigation.popView();
                } else {
                    navigation.toggleMenu();
                }
            });
        });

        // Buttons
        document.addEventListener('menubutton', function () {});
        document.addEventListener('searchbutton', function () {});

        // Splash
        $timeout(function () {
            navigator.splashscreen.hide();
        }, 250);
    });
}]);
