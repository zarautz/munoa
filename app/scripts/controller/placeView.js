'use strict';

Z.app.controller('PlaceViewController', ['$scope', 'placeMapper', 'placeFavorite', 'settings', function($scope, placeMapper, placeFavorite, settings) {
    this.toggleFavorite = function (id) {
        this.favorite.toggle(id);

        if ($scope.pushData.plistCtrl) {
            $scope.pushData.plistCtrl.refreshList();
        }
    }

    this.refresh = function () {
        var place = placeMapper.get({'language': settings.get('language'), 'id': $scope.pushData.id });

        this.favorite = placeFavorite;
        this.status   = place.status;
        this.place    = place.promise;console.log($scope);
    };

    this.refresh();
}]);
