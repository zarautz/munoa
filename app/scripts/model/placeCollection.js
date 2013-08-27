'use strict';

Z.Model.PlaceCollection = function (places) {
    this._places = places || [];
};

Z.Model.PlaceCollection.prototype._sort = function (array, config) {
    var types = {},
        i, sortFn;

    array  = array.slice();
    config = config.reverse();

    //
    // Define sort types
    //
    types.none = function () {
        return function () {
            return 0;
        };
    };

    types.distance = function(order, equalFn, places, point) {
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
    };

    types.property = function (order, equalFn, property) {
        return function (a, b) {
            if (a[property] > b[property]) {
                return order;
            } else if (a[property] < b[property]) {
                return -order;
            } else {
                return equalFn(a, b);
            }
        };
    };

    //
    // Compose sort function
    //
    // Default sort, this is the last executed
    sortFn = types.none();

    for (i = 0; i < config.length; i++) {
        var order  = config[i].order.toUpperCase(),
            type   = config[i].type,
            params = config[i].params || [];

        if (order === 'ASC') {
            order = 1;
        } else {
            order = -1;
        }

        sortFn = types[type].apply(this, [order, sortFn].concat(params));
    }

    // Sort the array
    array.sort(sortFn);

    return array;
};

Z.Model.PlaceCollection.prototype.all = function (order) {
    return this._sort(this._places, [
        {type: 'property', order: order || 'ASC', params: ['name']}
    ]);
};

Z.Model.PlaceCollection.prototype.allByDistance = function (point) {
    return this._sort(this._places, [
        {type: 'distance', order: 'ASC', params: [this._places, point]},
        {type: 'property', order: 'ASC', params: ['name']}
    ]);
};
