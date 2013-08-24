'use strict';

Z.app.controller('WeatherController', ['$filter', '$scope', 'ForecastStore', 'WeatherCodesStore', function($filter, $scope, ForecastStore, WeatherCodesStore) {
    $scope.changeTab = function (index) {
        $scope.activeTab = index;
    }

    $scope.refresh = function () {
        $scope.activeTab        = 0;
        $scope.status           = ForecastStore.getStatus();
        $scope.forecast         = ForecastStore.getForecast();
        $scope.today            = ForecastStore.getTodayForecast();
        $scope.meta             = ForecastStore.getMeta();
        $scope.todayWeatherCode = $scope.today.then(function (today) {
            return WeatherCodesStore.getOneByCode(today.getCurrentWeatherCode());
        })
    }

    $scope.refresh();
}]);
