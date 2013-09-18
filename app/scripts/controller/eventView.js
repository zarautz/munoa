'use strict';

Z.app.controller('EventViewController', ['$scope', 'placeMapper', 'phonegap', function($scope, placeMapper, phonegap) {
    this.refresh = function () {
        /*
        var place = placeMapper.get({'language': settings.get('language'), 'id': $scope.pushData.id });

        this.status = place.status;
        this.place  = place.promise;
        */
        this.event       = $scope.pushData.event;
        this.geolocation = phonegap.geolocation;
    };

    this.refresh();
}]);
