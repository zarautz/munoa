'use strict';

Z.app.controller('TidesController', ['tidesMapper', function(tidesMapper) {
    this.refresh = function () {
        var tides = tidesMapper.get();

        this.tides  = tides.promise;
        this.status = tides.status;
    };

    this.refresh();
}]);
