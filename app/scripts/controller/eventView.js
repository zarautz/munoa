'use strict';

Z.app.controller('EventViewController', ['$scope', 'placeMapper', 'settings', function($scope, placeMapper, settings) {
    this.refresh = function () {
        /*
        var place = placeMapper.get({'language': settings.get('language'), 'id': $scope.pushData.id });

        this.status = place.status;
        this.place  = place.promise;
        */
        this.event = $scope.pushData.event;
    };

    this.refresh();
}]);
