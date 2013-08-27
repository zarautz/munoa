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

    this.byDistance = function () {
        var that = this;

        this.places.then(function (collection) {
            that.pager.setItems(collection.allByDistance(that.userLocation));    
        });
    }

    this.byName = function () {
        var that = this;

        this.places.then(function (collection) {
            that.pager.setItems(collection.all('ASC'));    
        });
    }

    this.refresh = function () {
        var places = placesMapper.get({'language': settings.get('language'), 'types': 'health'}),
            that   = this;

        this.status = places.status;
        this.places = places.promise;

        this.userLocation = new Z.Model.Point(-2.175637, 43.286450);

        this.pager = new Z.Paginator();
        this.pager.setPageSize(10);

        this.places.then(function (collection) {
            that.byName();
        });
    };

    this.refresh();
}]);
