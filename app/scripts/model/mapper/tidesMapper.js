'use strict';

Z.app.factory('tidesMapper', ['$q', 'forecastSource', function ($q, forecastSource) {
    var tidesMapper = new Z.DataMapper($q);

    tidesMapper.setSources([forecastSource]);
    tidesMapper.setMapperCb(function (values) {
        var tides    = [],
            today    = (new Date()).toISOString().substring(0, 10),
            forecast = values[0].data,
            todayIndex, day, i;

        // Find out today index
        for (i = 0; i < forecast.length; i++) {
            if (forecast[i].date == today) {
                todayIndex = i;
                break;
            }
        }

        // Get the all valid days
        forecast = forecast.slice(todayIndex);

        // Process
        for (i = 0; i < forecast.length; i++) {
            day = forecast[i];

            tides.push(new Z.Model.Tide({
                'date': day.date,
                'high': day.tide.high,
                'low':  day.tide.low
            }));
        }

        return tides;
    });

    return tidesMapper;
}]);
