'use strict';

Z.app.factory('sort', [function() {
    var sort = new Z.Sort();

    sort.addType('distance', function(order, equalFn, places, point) {
        var distances = {},
            i;

        // Calculate distance for each place
        for (i = 0; i < places.length; i++) {
            distances[places[i].id] = places[i].distanceTo(point);
        }

        // Sort function
        return function (a, b) {
            if (distances[a.id] > distances[b.id]) {
                return order;
            } else if (distances[a.id] < distances[b.id]) {
                return -order;
            } else {
                return equalFn(a, b);
            }
        };
    });

    sort.addType('property', function (order, equalFn, property) {
        return function (a, b) {
            if (a[property] > b[property]) {
                return order;
            } else if (a[property] < b[property]) {
                return -order;
            } else {
                return equalFn(a, b);
            }
        };
    });

    return sort;
}]);
