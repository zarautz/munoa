'use strict';

Z.app.factory('placeTypesSource', ['api', 'cache', '$q', function (api, cache, $q) {
    var placeTypesSource = new Z.DataSource(cache, $q);

    placeTypesSource.setCacheKeys(['[placeTypes]', 'language']);
    placeTypesSource.setCacheTTL(60 * 60 * 12);

    placeTypesSource.setLoadDataCb(function (params) {
        return api.getPlaceTypes(params);
    });

    return placeTypesSource;
}]);
