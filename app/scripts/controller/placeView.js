'use strict';

Z.app.controller('PlaceViewController', ['$scope', '$timeout', 'placeMapper', 'placeFavorite', 'settings', function($scope, $timeout, placeMapper, placeFavorite, settings) {
    var that = this,
        cssTransitionDuration = 300;

    this.toggleFavorite = function (id) {
        this.favorite.toggle(id);

        if ($scope.pushData.plistCtrl) {
            $scope.pushData.plistCtrl.refreshList();
        }
    };

    this.toggleMap = function () {
        if (this.mapIsInTransition) {
            return false;
        }

        this.mapIsInTransition = true;
        this.mapIsActive = !this.mapIsActive;

        $timeout(function () {
            that.mapIsInTransition = false;
        }, cssTransitionDuration);
    };

    this.refresh = function () {
        var place = placeMapper.get({'language': settings.get('language'), 'id': $scope.pushData.id });

        this.favorite = placeFavorite;
        this.status   = place.status;
        this.place    = place.promise;console.log($scope);
        this.title    = $scope.pushData.name;
    };

    this.refresh();
}]);
