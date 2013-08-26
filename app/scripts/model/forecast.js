'use strict';

Z.Model.Forecast = function () {}

Z.Model.Forecast.prototype.getCurrentWeatherCode = function () {
    return this.weather.forecast[this.getCurrentHourIndex()].code;
}        

Z.Model.Forecast.prototype.getWeatherCode = function () {
    var today          = (new Date()).toISOString().substring(0, 10),
        useCurrentHour = today == this.date,
        forecast       = this.weather.forecast,
        key;

    if (useCurrentHour) {
        key = Math.floor((new Date()).getHours() / (24 / forecast.length));
    } else {
        key = Math.floor(12 / (24 / forecast.length));
    }

    return forecast[key].code;
}

Z.Model.Forecast.prototype.getCurrentHourIndex = function () {
    return Math.floor((new Date()).getHours() / (24 / this.weather.forecast.length));
}
