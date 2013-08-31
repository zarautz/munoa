'use strict';

Z.app.factory('placeTypesMapper', ['$q', 'placeTypesSource', function ($q, placeTypesSource) {
    var placeTypesMapper = new Z.DataMapper($q);

    placeTypesMapper.setSources([placeTypesSource]);
    placeTypesMapper.setMapperCb(function (values) {
        return values[0].data;
    });

    return placeTypesMapper;
}]);
