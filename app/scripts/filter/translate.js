'use strict';

Z.app.filter('translate', ['babel', function (babel) {
    return function (key) {
        return babel.translate(key);
    };
}]);
