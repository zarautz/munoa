'use strict';

Z.app.controller('PlaceViewController', ['$scope', '$timeout', 'placeMapper', 'placeFavorite', 'settings', 'phonegap', function($scope, $timeout, placeMapper, placeFavorite, settings, phonegap) {
    this.toggleFavorite = function (id) {
        this.favorite.toggle(id);

        if ($scope.pushData.plistCtrl) {
            $scope.pushData.plistCtrl.refreshList();
        }
    };

    this.refresh = function () {
        var place = placeMapper.get({'language': settings.get('language'), 'id': $scope.pushData.id });

        this.favorite    = placeFavorite;
        this.status      = place.status;
        this.place       = place.promise;
        this.title       = $scope.pushData.name;
        this.geolocation = phonegap.geolocation;
        this.zarauztarra = settings.get('profile') === 'zarautz';
        this.language    = settings.get('language');
    };

    this.refresh();
}]);
