'use strict';

Z.app.factory('placesSource', ['api', 'cache', '$q', function (api, cache, $q) {
    var placesSource = new Z.DataSource(cache, $q);

    placesSource.setCacheKeys(['[places]', 'language', 'types', 'limit', 'offset']);
    placesSource.setCacheTTL(5);

    placesSource.setLoadDataCb(function (params) {
        return api.getPlaces(params);
    });

    return placesSource;
}]);
