'use strict';

Z.app.controller('EventController', ['$scope', 'eventsMapper', 'settings', function($scope, eventsMapper, settings) {
    this.clearFilters = function () {
        this.filter.category = null;

        this.refreshList();
    };

    this.isFiltered = function () {
        return this.filter.category !== null;
    };

    this.refresh = function () {
        var events = eventsMapper.get({
            language: settings.get('language'),
            from: moment().format('YYYY-MM-DD'),
            to: moment().add('days', 30).format('YYYY-MM-DD')
        });

        this.events = events.promise;
        this.status = events.status;
    };

    this.refresh();
}]);
