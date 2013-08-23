'use strict';

Z.app.factory('eventsStore', ['cache', 'apiInterface', '$q', function(cache, apiInterface, $q) {
    var EventsStore = new Z.DataStore('events', cache, $q);

    EventsStore.addMethod('getEvents', function () {
        return apiInterface.getEvents();
    }, function (apiResponse) {
        return apiResponse.data;
    });

    EventsStore.addMethod('getEvent', function (id) {
        return apiInterface.getEvent(id);
    }, function (apiResponse) {
        return apiResponse.data;
    });

    return EventsStore;
}]);
