'use strict';

Z.app.factory('placeTypesSource', ['api', 'cache', '$q', '$timeout', function (api, cache, $q, $timeout) {
    var placeTypesSource = new Z.DataSource(cache, $q);

    placeTypesSource.setCacheKeys(['[placeTypes]', 'language']);
    placeTypesSource.setCacheTTL(5);
    placeTypesSource.setLoadDataCb(function (params) {
        return $timeout(function () {
            return api.getPlaceTypes(params);
        }, Math.random() * 2000);
    });

    return placeTypesSource;
}]);
