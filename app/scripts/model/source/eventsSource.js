'use strict';

Z.app.factory('eventsSource', ['api', 'cache', '$q', function (api, cache, $q) {
    var eventsSource = new Z.DataSource(cache, $q);

    eventsSource.setCacheKeys(['[events]']);
    eventsSource.setCacheTTL(5);

    eventsSource.setLoadDataCb(function () {
        return api.getEvents();
    });

    return eventsSource;
}]);
