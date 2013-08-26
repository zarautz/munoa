'use strict';

Z.app.factory('forecastMapper', ['$q', 'forecastSource', 'weatherCodesSource', function ($q, forecastSource, weatherCodesSource) {
    var forecastMapper = new Z.DataMapper($q);

    forecastMapper.setSources([forecastSource, weatherCodesSource]);
    forecastMapper.setMapperCb(function (values) {
        var result     = {},
            today      = (new Date()).toISOString().substring(0, 10),
            forecast   = values[0].data,
            todayIndex = 0,
            code, i;

        // Find out today index
        for (i = 0; i < forecast.length; i++) {
            if (forecast[i].date == today) {
                todayIndex = i;
                break;
            }
        }

        // Get the next four forecasts
        forecast = forecast.slice(todayIndex, todayIndex + 4);

        // Convert "JSON" in Forecast objects
        angular.forEach(forecast, function (day, i) {
            // Weather Codes
            angular.forEach(day.weather.forecast, function (period, j) {
                code      = values[1].data[period.code];
                code.code = period.code;

                // Set object for code
                period.code = code;
            })

            // To object
            forecast[i] = angular.extend(new Z.Model.Forecast(), day);
        });

        // Prepare final object
        result.days  = forecast;
        result.meta  = values[0].meta;
        result.today = forecast[0];

        return result;
    });

    return forecastMapper;
}]);
