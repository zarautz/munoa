'use strict';

Z.app.controller('EventController', function($scope, $timeout, WeatherCodesStore) {
    $scope.refresh = function () {
        this.all    = WeatherCodesStore.getAll();
        this.code   = WeatherCodesStore.getOneByCode(11);
        this.status = WeatherCodesStore.getStatus();
        this.meta   = WeatherCodesStore.getMeta();
    };

    $scope.loadCode = function (code) {
        $scope.code = WeatherCodesStore.getOneByCode(code);
    }

    $scope.refresh();
});
