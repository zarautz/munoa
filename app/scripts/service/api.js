'use strict';

Z.app.factory('api', ['apiHost', '$http', function(apiHost, $http) {
    return {
        getEvent: function (id) {
            return $http({
                method: 'GET',
                url: apiHost + '/events/' + id
            }).then(function (response) {
                return response.data;
            });
        },
        getEvents: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/events'
            }).then(function (response) {
                return response.data;
            });
        },
        getForecast: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/forecast'
            }).then(function (response) {
                return response.data;
            });
        },
        getWeatherCodes: function () {
            return $http({
                method: 'GET',
                //params: {language: 'eu'},
                url: apiHost + '/forecast/weather/codes'
            }).then(function (response) {
                return response.data;
            });
        },
        getPlace: function (id) {
            return $http({
                method: 'GET',
                url: apiHost + '/places/' + id
            }).then(function (response) {
                return response.data;
            });
        },
        getPlaceTypes: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/places/types'
            }).then(function (response) {
                return response.data;
            });
        },
        getPlaces: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/places'
            }).then(function (response) {
                return response.data;
            });
        },
        getZuZarautzPosts: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/posts/zuzarautz'
            }).then(function (response) {
                return response.data;
            });
        }
    };
}]);
