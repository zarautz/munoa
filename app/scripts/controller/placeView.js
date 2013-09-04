'use strict';

Z.app.controller('PlaceViewController', ['$scope', 'placeMapper', 'settings', function($scope, placeMapper, settings) {
    this.toggleIsFavorite = function () {
        this.isFavorite = !this.isFavorite;
    };

    this.refresh = function () {
        var place = placeMapper.get({'language': settings.get('language'), 'id': $scope.pushData.id });

        this.isFavorite = false;
        this.status = place.status;
        this.place  = place.promise;
    };

    this.refresh();
}]);
