'use strict';

Z.app.factory('placesMapper', ['$q', 'placesSource', 'placeTypesSource', function ($q, placesSource, placeTypesSource) {
    var placesMapper = new Z.DataMapper($q);

    placesMapper.setSources([placesSource, placeTypesSource]);
    placesMapper.setMapperCb(function (values) {
        return values;
    });

    return placesMapper;
}]);
