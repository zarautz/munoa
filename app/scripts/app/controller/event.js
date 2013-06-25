'use strict';

Z.app.controller('EventController', ['Event', function(Event) {
    this.events = Event.query();
}]);
