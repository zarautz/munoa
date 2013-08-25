'use strict';

Z.app.factory('zuZarautzMapper', ['$q', 'zuZarautzSource', function ($q, zuZarautzSource) {
    var zuZarautzMapper = new Z.DataMapper($q);

    zuZarautzMapper.setSources([zuZarautzSource]);
    zuZarautzMapper.setMapperCb(function (values) {
        return values[0].data;
    });

    return zuZarautzMapper;
}]);
