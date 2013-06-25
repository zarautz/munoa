'use strict';

Z.app.controller('EventController', ['$http', 'Event', function($http, Event) {
    var that = this;

    this.events = Event.query();
}]);
