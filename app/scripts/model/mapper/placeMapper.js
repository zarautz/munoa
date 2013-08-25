'use strict';

Z.app.factory('placeMapper', ['$q', 'placeSource', 'placeTypesSource', function ($q, placeSource, placeTypesSource) {
    var placeMapper = new Z.DataMapper($q);

    placeMapper.setSources([placeSource, placeTypesSource]);
    placeMapper.setMapperCb(function (values) {
        return values;
    });

    return placeMapper;
}]);
