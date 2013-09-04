'use strict';

Z.app.factory('filter', ['placeFavorite', function(placeFavorite) {
    var filter = new Z.Filter();

    filter.addType('favorite', function (value) {
        return placeFavorite.isFavorite(this.id) === value;
    });

    filter.addType('property', function (value, property, testType) {
        testType = testType || 'contains';
        testType = testType.toLowerCase();

        if (testType === 'contains') {
            return this[property].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        } else if (testType === 'equals') {
            return this[property] === value;
        }

        return false;
    });

    filter.addType('placeType', function (type) {
        var i;

        for (i = 0; i < this.types.length; i++) {
            if (this.types[i].code === type) {
                return true;
            }
        }

        return false;
    });

    return filter;
}]);
