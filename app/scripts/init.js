'use strict';

var Z = {};

Z.app = angular.module('munoa.zarautz', ['ngResource', 'ngMobile']);

Z.app.value('apiHost', true ? 'http://pagoeta.zarautz.org/app_dev.php/v1' : 'http://local.data.zarautz.org');

Z.app.run(['$rootScope', 'babel', function ($rootScope, babel) {
    $rootScope.__ = function (key) {
        return babel.translate(key);
    };
}]);
