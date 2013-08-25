'use strict';

Z.app.factory('eventsMapper', ['$q', 'eventsSource', function ($q, eventsSource) {
    var eventsMapper = new Z.DataMapper($q);

    eventsMapper.setSources([eventsSource]);
    eventsMapper.setMapperCb(function (values) {
        return values[0].data;
    });

    return eventsMapper;
}]);
