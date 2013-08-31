'use strict';

Z.Filter = function Filter() {
    this.types = {};
};

Z.Filter.prototype.addType = function (name, fn) {
    this.types[name] = fn;
};

Z.Filter.prototype.filter = function(array, configs) {
    var result = [],
        i, j, valid, type, value, params;

    configs = configs || [];

    if (configs.length > 0) {
        for (i = 0; i < array.length; i++) {
            valid = true;

            // Test every config filter
            // It must pass all the filters to be a valid entry
            for (j = 0; j < configs.length; j++) {
                type   = configs[j].type;
                value  = configs[j].value;
                params = configs[j].params;

                // If it does not pass the test, it's not valid, and break the for loop
                if (!this.types[type].apply(array[i], [value].concat(params))) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                result.push(array[i]);
            }
        }
    } else {
        return array;
    }

    return result;
};
