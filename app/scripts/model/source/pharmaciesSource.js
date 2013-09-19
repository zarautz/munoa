'use strict';

Z.app.factory('pharmaciesSource', ['api', 'cache', '$q', function (api, cache, $q) {
    var pharmaciesSource = new Z.DataSource(cache, $q);

    pharmaciesSource.setCacheKeys(['[pharmaciesOnDuty]']);
    pharmaciesSource.setCacheTTL(60 * 60 * 6);

    pharmaciesSource.setLoadDataCb(function () {
        return api.getPharmaciesOnDuty();
    });

    return pharmaciesSource;
}]);
