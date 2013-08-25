'use strict';

Z.app.controller('EventController', function($scope, $timeout, forecastMapper, placeTypesMapper, placesMapper, placeMapper) {
    $scope.refresh = function () {
        console.log('-----');

        // Forecast
        var forecast = forecastMapper.get({'language': 'fr'});

        this.forecast       = forecast.promise;
        this.forecastStatus = forecast.status;

        // Get PlaceTypes
        var types = placeTypesMapper.get({'language': 'fr'});

        this.types       = types.promise;
        this.typesStatus = types.status;

        // Get Places
        var places = placesMapper.get({
            'language': 'fr',
            'types': 'book_store',
            'limit': 2,
            'offset': 2
        });

        this.places       = places.promise;
        this.placesStatus = places.status;

        // Get Egaroa place
        var place = placeMapper.get({
            'language': 'fr',
            'id': 454
        });

        this.place       = place.promise;
        this.placeStatus = place.status;

        // MetaStatus
        this.status = new Z.Status([
            this.forecastStatus,
            this.typesStatus,
            this.placesStatus,
            this.placeStatus
        ]);
    };

    $scope.refresh();
});
