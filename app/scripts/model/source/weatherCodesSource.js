'use strict';

Z.app.factory('weatherCodesSource', ['api', 'cache', '$q', function (api, cache, $q) {
    var weatherCodesSource = new Z.DataSource(cache, $q);

    weatherCodesSource.setCacheKeys(['[weatherCodes]', 'language'])
    weatherCodesSource.setCacheTTL(60 * 60 * 72);

    weatherCodesSource.setLoadDataCb(function (params) {
        return api.getWeatherCodes(params);
    });

    return weatherCodesSource;
}]);
