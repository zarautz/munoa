'use strict';

var Z = {};

// Create the Angular app
Z.app = angular.module('zarautz', ['ngMobile']);

Z.app.run(['$rootScope', 'babel', function ($rootScope, babel) {
    $rootScope.__ = function (key) {
        return babel.translate(key);
    };
}]);
