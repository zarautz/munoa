'use strict';

Z.app.factory('placesStorea', [function () {
    return {
        getAll: function (params) {
            return new Z.DataPromise('a', new Z.Status());
        },
        getById: function (id) {
            return new Z.DataPromise('a', new Z.Status());
        },
        getTypes: function () {
            return new Z.DataPromise('a', new Z.Status());
        }
    }
}]);
