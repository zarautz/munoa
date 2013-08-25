'use strict';

Z.app.factory('forecastMapper', ['api', 'cache', '$q', function (api, cache, $q) {
    var weatherCodesSource = new Z.DataSource(cache, $q);

    weatherCodesSource.setCacheKeys(['[weatherCodes]', 'language'])
    weatherCodesSource.setCacheTTL(10);

    weatherCodesSource.setLoadDataCb(function (params) {
        return api.getWeatherCodes(params);
    });

    return weatherCodesSource;
}]);
