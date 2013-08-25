'use strict';

Z.app.factory('forecastSource', ['api', 'cache', '$q', function (api, cache, $q) {
    var forecastSource = new Z.DataSource(cache, $q);

    forecastSource.setCacheKeys(['[forecast]']);
    forecastSource.setCacheTTL(5);

    forecastSource.setLoadDataCb(function () {
        return api.getForecast();
    });

    return forecastSource;
}]);
