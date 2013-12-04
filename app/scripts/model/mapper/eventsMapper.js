'use strict';

Z.app.factory('eventsMapper', ['$q', 'eventsSource', function ($q, eventsSource) {
    var eventsMapper = new Z.DataMapper($q);

    eventsMapper.setSources([eventsSource]);
    eventsMapper.setMapperCb(function (values) {
        var events = { 'exhibition': [], 'other': [] },
            eventCounter = { 'exhibition': -1, 'other': -1 },
            eventDate,
            date = '',
            i;

        for (i = 0; i < values[0].data.length; i++) {
            var eventType,
                eventSubevents = values[0].data[i].subEvents,
                subEvents = [],
                sdate = '', sd, sdi = -1,
                si;

            // Check the category type, to separate exhibitions
            if (values[0].data[i].category.code === 'exhibition') {
                eventType = 'exhibition';
            } else {
                eventType = 'other';
            }

            // Get the event date
            // If the event has subevents, event date will be the date of the first subevent
            if (eventType === 'exhibition') {
                eventDate = moment(values[0].data[i].endAt).format('YYYY-MM-DD');
            } else if (eventSubevents.length > 0) {
                eventDate = moment(eventSubevents[0].startAt).format('YYYY-MM-DD');
            } else {
                eventDate = moment(values[0].data[i].startAt).format('YYYY-MM-DD');
            }

            if (eventDate !== date) {
                eventCounter[eventType] = eventCounter[eventType] + 1;
                date = eventDate;
                events[eventType].push({ date: eventDate, events: [] });
            }

            for (si = 0; si < eventSubevents.length; si++) {
                sd = moment(eventSubevents[si].startAt).format('YYYY-MM-DD');

                if (sd !== sdate) {
                    sdi = sdi + 1;
                    sdate = sd;
                    subEvents.push({ date: sd, events: [] });
                }

                subEvents[sdi].events.push(new Z.Model.Event(values[0].data[i].subEvents[si]));
            }

            // Create object
            values[0].data[i].subEvents = subEvents;
            events[eventType][eventCounter[eventType]].events.push(new Z.Model.Event(values[0].data[i]));
        }

        return events;
    });

    return eventsMapper;
}]);
