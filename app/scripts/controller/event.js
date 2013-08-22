'use strict';

Z.app.controller('EventController', ['$scope', 'eventsStore', function($scope, eventsStore) {
    $scope.refresh = function () {
        $scope.events = eventsStore.getEvents();
    }

    // Init
    $scope.refresh();
}]);
