'use strict';

Z.app.factory('placesSource', ['api', 'cache', '$q', '$timeout', function (api, cache, $q, $timeout) {
    var placesSource = new Z.DataSource(cache, $q);

    placesSource.setCacheKeys(['[places]', 'language', 'types', 'limit', 'offset']);
    placesSource.setCacheTTL(5);
    placesSource.setLoadDataCb(function (params) {
        return $timeout(function () {
            return api.getPlaces(params);
        }, Math.random() * 2000);
    });

    return placesSource;
}]);
