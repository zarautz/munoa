'use strict';

var Z = {};

// Create the Angular app
Z.app = angular.module('zarautz', ['ngResource', 'ngMobile']);

Z.app.value('host', true ? 'http://pagoeta.zarautz.org/app_dev.php/v1' : 'http://local.data.zarautz.org');

Z.app.run(['$rootScope', 'babel', function ($rootScope, babel) {
    $rootScope.__ = function (key) {
        return babel.translate(key);
    };
}]);
