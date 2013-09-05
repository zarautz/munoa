'use strict';

Z.app.controller('EventController', ['$scope', 'eventsMapper', 'settings', function($scope, eventsMapper, settings) {
    $scope.refresh = function () {
        var events = eventsMapper.get({
            language: settings.get('language'),
            from: '2013-08-01',
            to: '2013-08-15'
        });

        this.events = events.promise;
        this.status = events.status;
    };

    $scope.refresh();
}]);
