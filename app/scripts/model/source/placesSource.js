'use strict';

Z.app.factory('placesSource', ['api', 'cache', '$q', function (api, cache, $q) {
    var placesSource = new Z.DataSource(cache, $q);

    placesSource.setCacheKeys(['[places]', 'language', 'types']);
    placesSource.setCacheTTL(5);

    placesSource.setLoadDataCb(function (params) {
        return api.getAllPlaces(params);
    });

    return placesSource;
}]);
