'use strict';

Z.app.controller('PlaceListController', ['$scope', 'placesMapper', 'placesConfig', 'settings', function($scope, placesMapper, placesConfig, settings) {
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
        this.section = $scope.pushData.section;
        this.group   = $scope.pushData.group;
        this.types   = placesConfig.getSection(this.section).getGroup(this.group).getTypes();

        var places = placesMapper.get({'language': settings.get('language'), 'types': this.types.join(',') });

        this.status = places.status;
        this.places = places.promise;

        this.userLocation = new Z.Model.Point(-2.175637, 43.286450);

        this.pager = new Z.Paginator();
        this.pager.setPageSize(10);

        this.byName();
    };

    this.refresh();
}]);
