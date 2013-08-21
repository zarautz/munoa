'use strict';

Z.app.factory('apiInterface', ['apiHost', '$http', function(apiHost, $http) {
    return {
        getEvent: function (id) {
            return $http({
                method: 'GET',
                url: apiHost + '/events/' + id
            });  
        },
        getEvents: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/events'
            });  
        },
        getForecast: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/forecast'
            });
        },
        getWeatherCodes: function () {
            return $http({
                method: 'GET',
                //params: {language: 'eu'},
                url: apiHost + '/forecast/weather/codes'
            });
        },
        getPlace: function (id) {
            return $http({
                method: 'GET',
                url: apiHost + '/places/' + id
            });  
        },
        getPlaceTypes: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/places/types'
            });  
        },
        getPlaces: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/places'
            });  
        },
        getZuZarautzPosts: function () {
           return $http({
               method: 'GET',
               url: apiHost + '/posts/zuzarautz'
           }); 
        }
    };
}]);
