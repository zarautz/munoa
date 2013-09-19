'use strict';

Z.app.factory('pharmaciesMapper', ['$q', 'pharmaciesSource', function ($q, pharmaciesSource) {
    var pharmaciesMapper = new Z.DataMapper($q);

    pharmaciesMapper.setSources([pharmaciesSource]);
    pharmaciesMapper.setMapperCb(function (values) {
        var today = [],
            places = {},
            i, j, types, place;

        for (i in values[0].data.places) {
            place = values[0].data.places[i];

            // Longitude, Latitude            
            place.location = new Z.Model.Point(place.geometry.coordinates[0], place.geometry.coordinates[1]);
            delete place.geometry;

            // Create object
            places[place.id] = new Z.Model.Place(place);
        }

        // Process pharmacies on duty today
        for (i = 0; i < values[0].data.hours.length; i++) {
            if (moment().format('YYYY-MM-DD') === values[0].data.hours[i].date) {
                today = [
                    {
                        date: values[0].data.hours[i].date,
                        from: 0, to: 9,
                        time: '00:00-09:00',
                        period: 'night',
                        place: places[values[0].data.hours[i]['0000-0859']]
                    },
                    {
                        date: values[0].data.hours[i].date,
                        from: 8, to: 22,
                        time: '09:00-22:00',
                        period: 'day',
                        place: places[values[0].data.hours[i]['0900-2159']]
                    },
                    {
                        date: values[0].data.hours[i].date,
                        from: 21, to: 24,
                        time: '22:00-09:00',
                        period: 'night',
                        place: places[values[0].data.hours[i]['2200-2359']]
                    }   
                ];
            }
        }

        values[0].data = today;

        return values[0];
    });

    return pharmaciesMapper;
}]);
