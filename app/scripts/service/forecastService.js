function ForecastService($http, $q, cache)
{
    this.$http = $http;
    this.$q    = $q;
    this.cache = cache;
}

ForecastService.prototype.getForecast = function () {

}

ForecastService.prototype.getTodayForecast = function () {
    return this.getForecast().then(function () {

    });
}