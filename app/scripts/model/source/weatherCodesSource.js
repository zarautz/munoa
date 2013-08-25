'use strict';

Z.app.factory('forecastMapper', ['api', 'cache', '$q', '$timeout', function (api, cache, $q, $timeout) {
    var weatherCodesSource = new Z.DataSource(cache, $q);

    weatherCodesSource.setCacheKeys(['[weatherCodes]', 'language'])
    weatherCodesSource.setCacheTTL(10);
    weatherCodesSource.setLoadDataCb(function (params) {
        return $timeout(function () {
            if (Math.random() > 0.5) {
                throw "Kakaka!";
            }

            return api.getWeatherCodes(params);
        }, Math.random() * 2000);
    });

    return weatherCodesSource;
}]);
