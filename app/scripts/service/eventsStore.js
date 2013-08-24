'use strict';

Z.app.factory('EventsStore', ['api', 'cache', '$q', function (api, cache, $q) {
    function EventsStore(api, events) {
        this._api  = api;
        this._events = events;
    }

    EventsStore.prototype._fetchEvents = function () {
        if (!this._events.isValid()) {
            var that = this;

            // Set a promise for the data, this will only be called 
            // if there is not valid cache
            this._events.load(function () {
                return that.api.getEvents();
            });
        }
    
        return this._events.get();
    };
  
    EventsStore.prototype.getStatus = function () {
        return this._events.getStatus();
    };

    EventsStore.prototype.getMeta = function () {
        return this._fetchEvents().then(function (response) {
            return response.meta;
        });
    }
  
    EventsStore.prototype.getAll = function () {
        return this._fetchEvents().then(function (response) {
            return response.data;
        });
    };
  
    return new EventsStore(api, new Z.DataBag(cache, $q, 'events'));
}]);
