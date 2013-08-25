'use strict';

Z.app.controller('EventController', ['$scope', 'eventsMapper', function($scope, eventsMapper) {
    $scope.refresh = function () {
        var events = eventsMapper.get();

        this.events = events.promise;
        this.status = events.status;
    };

    $scope.refresh();
}]);
