'use strict';

Z.Sort = function Sort() {
    this.types = {};

    // Basic type for the sort function
    this.types.none = function () {
        return function () {
            return 0;
        };
    };
};

Z.Sort.prototype.addType = function (name, fn) {
    this.types[name] = fn;
};

Z.Sort.prototype.sort = function (array, config) {
    var i, sortFn;

    array  = array.slice();
    config = config.reverse();

    // Compose sort function
    // Default sort, this is the last executed
    sortFn = this.types.none();

    for (i = 0; i < config.length; i++) {
        var order  = config[i].order.toUpperCase(),
            type   = config[i].type,
            params = config[i].params || [];

        if (order === 'ASC') {
            order = 1;
        } else {
            order = -1;
        }

        sortFn = this.types[type].apply(this, [order, sortFn].concat(params));
    }

    // Sort the array
    array.sort(sortFn);

    return array;
};
