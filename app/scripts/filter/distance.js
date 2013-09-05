'use strict';

Z.app.filter('distance', ['$filter', function ($filter) {
    return function(number) {
        var fractionSize = 1,
            unit = 'km';

        if (number < 1) {
            number = number * 1000;
            fractionSize = 0;
            unit = 'm';
        }

        return $filter('number')(number, fractionSize) + ' ' + unit;
    };
}]);
