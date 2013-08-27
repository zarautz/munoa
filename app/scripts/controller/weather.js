'use strict';

Z.app.controller('WeatherController', ['$scope', 'settings', 'forecastMapper', function($scope, settings, forecastMapper) {
    $scope.changeTab = function (index) {
        $scope.activeTab = index;
    };

    $scope.refresh = function () {
        $scope.activeTab = 0;

        // Forecast
        var forecast = forecastMapper.get({'language': settings.get('language')});

        $scope.forecast = forecast.promise;
        $scope.status   = forecast.status;
    };

    $scope.refresh();
}]);
