'use strict';

var Z = { Model: {} };

Z.app = angular.module('munoa', ['angularMoment', 'ngRoute', 'ngTouch', 'ngSanitize']);

Z.app.value('apiHost', true ? 'http://pagoeta.illarra.com/v1' : 'http://pagoeta.zarautz.org/app_dev.php/v1');
Z.app.value('googleApiKey', 'AIzaSyBopLXCM1kLoklpwOOvyA_QurVbj1H02C0');

// We force early initialization by injecting the services
Z.app.run(['$rootScope', '$window', '$timeout', 'navigation', 'phonegap', 'settings', function ($rootScope, $window, $timeout, navigation, phonegap, settings) {
    // Init Moment language
    moment.lang(settings.get('language'));

    // Make navigation accesible by all the scopes
    $rootScope.navigation = navigation;
    $rootScope.settings   = settings;

    phonegap.onDeviceReady().then(function () {
        // Detect iOS7 for status-bar CSS hacks
        if ($window.device.platform === 'iOS' && parseFloat($window.device.version) >= 7.0) {
            angular.element(document.documentElement).addClass('x-ios7');
        }

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
