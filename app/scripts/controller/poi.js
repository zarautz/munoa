'use strict';

Z.app.controller('PoiController', ['placesMapper', 'settings', function(placesMapper, settings) {
    this.byDistance = function () {
        var that = this;

        this.places.then(function (collection) {
            that.pager.setItems(collection.allByDistance(that.userLocation));
            that.pager.moveTo(1);
        });
    };

    this.byName = function () {
        var that = this;

        this.places.then(function (collection) {
            that.pager.setItems(collection.all('ASC'));
            that.pager.moveTo(1);
        });
    };

    this.refresh = function () {
        var places = placesMapper.get({'language': settings.get('language'), 'types': 'point_of_interest'});

        this.status = places.status;
        this.places = places.promise;

        this.userLocation = new Z.Model.Point(-2.175637, 43.286450);

        this.pager = new Z.Paginator();
        this.pager.setPageSize(10);

        this.byName();
    };

    this.refresh();
}]);
