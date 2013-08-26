'use strict';

Z.app.controller('WeatherController', ['$scope', 'forecastMapper', function($scope, forecastMapper) {
    $scope.changeTab = function (index) {
        $scope.activeTab = index;
    }

    $scope.refresh = function () {
        $scope.activeTab = 0;

        // Forecast
        var forecast = forecastMapper.get({'language': 'fr'});

        $scope.forecast = forecast.promise;
        $scope.status   = forecast.status;
    }

    $scope.refresh();
}]);
