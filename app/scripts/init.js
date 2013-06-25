'use strict';

var Z = {};

// Create the Angular app
Z.app = angular.module('zarautz', ['ngResource', 'ngMobile']);

Z.app.value('host', false ? 'http://zarautz.illarra.com' : 'http://local.data.zarautz.org');

Z.app.run(['$rootScope', 'babel', function ($rootScope, babel) {
    $rootScope.__ = function (key) {
        return babel.translate(key);
    };
}]);
