'use strict';

Z.app.controller('EventController', ['$scope', 'eventsMapper', 'settings', function($scope, eventsMapper, settings) {
    this.toggleFilters = function () {
        this.filter.show = !this.filter.show;
    };

    this.setFilter = function (filter) {
        this.filter.type = filter;
        this.toggleFilters();
    };

    this.refresh = function () {
        var events = eventsMapper.get({
            language: settings.get('language'),
            from: moment().format('YYYY-MM-DD'),
            to: moment().add('days', 30).format('YYYY-MM-DD')
        });

        this.events = events.promise;
        this.filter = { show: false, type: 'other' };
        this.status = events.status;
    };

    this.refresh();
}]);
