'use strict';

Z.app.controller('EventController', ['event', function(event) {
    this.events = event.findAll();
}]);
