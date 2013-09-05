'use strict';

Z.app.factory('eventsMapper', ['$q', 'eventsSource', function ($q, eventsSource) {
    var eventsMapper = new Z.DataMapper($q);

    eventsMapper.setSources([eventsSource]);
    eventsMapper.setMapperCb(function (values) {
        var events = [],
            i;

        for (i = 0; i < values[0].data.length; i++) {
            // Create object
            events.push(new Z.Model.Event(values[0].data[i]));
        }

        return events;
    });

    return eventsMapper;
}]);
