'use strict';

Z.app.controller('EventController', ['$scope', 'eventsStore', 'forecastStore', function($scope, eventsStore, forecastStore) {
    $scope.refresh = function () {
        $scope.events   = eventsStore.getEvents();
        $scope.forecast = forecastStore.getForecast();
        $scope.today    = $scope.forecast.getTodayForecast();
    }

    // Init
    $scope.refresh();
}]);
