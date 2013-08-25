'use strict';

Z.app.factory('forecastSource', ['api', 'cache', '$q', '$timeout', function (api, cache, $q, $timeout) {
    var forecastSource = new Z.DataSource(cache, $q);

    forecastSource.setCacheKeys(['[forecast]']);
    forecastSource.setCacheTTL(5);
    forecastSource.setLoadDataCb(function () {
        return $timeout(function () {
            return api.getForecast();
        }, Math.random() * 2000);
    });

    return forecastSource;
}]);
