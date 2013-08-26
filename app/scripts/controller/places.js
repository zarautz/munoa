'use strict';

Z.app.controller('PlacesController', ['$scope', 'placesMapper', 'settings', function($scope, placesMapper, settings) {
    /*
        'health',
        'wifi',
        'atm',
        'stores',
        'parking',
        'sports',
        'transport',
        'recycling',
        'gastronomy',
        'lodging'

        http://www.geodatasource.com/developers/javascript
    */
    $scope.refresh = function () {
        var places = placesMapper.get({'language': settings.get('language'), 'types': 'health'});

        this.places = places.promise;
        this.status = places.status;
    };

    $scope.refresh();
}]);
