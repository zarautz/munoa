'use strict';

Z.app.factory('eventsMapper', ['$q', 'eventsSource', function ($q, eventsSource) {
    var eventsMapper = new Z.DataMapper($q);

    eventsMapper.setSources([eventsSource]);
    eventsMapper.setMapperCb(function (values) {
        var events = [],
            date = '', d, di = -1,
            i;

        for (i = 0; i < values[0].data.length; i++) {
            var subEvents = [],
                sdate = '', sd, sdi = -1,
                si;

            d = moment(values[0].data[i].startAt).format('YYYY-MM-DD');

            if (d !== date) {
                di = di + 1;
                date = d;
                events.push({ date: d, events: [] });
            }

            for (si = 0; si < values[0].data[i].subEvents.length; si++) {
                sd = moment(values[0].data[i].subEvents[si].startAt).format('YYYY-MM-DD');

                if (sd !== sdate) {
                    sdi = sdi + 1;
                    sdate = sd;
                    subEvents.push({ date: sd, events: [] });
                }

                subEvents[sdi].events.push(new Z.Model.Event(values[0].data[i].subEvents[si]));
            }

            // Create object
            values[0].data[i].subEvents = subEvents;
            events[di].events.push(new Z.Model.Event(values[0].data[i]));
        }

        return events;
    });

    return eventsMapper;
}]);
