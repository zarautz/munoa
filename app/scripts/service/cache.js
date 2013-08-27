'use strict';

Z.app.factory('cache', ['$log', function($log) {
    var store = window.store;

    return {
        clear: function () {
            store.clear();
        },
        set: function(key, value, ttl) {
            ttl  = ttl || 0;
            ttl *= 1000;

            $log.debug('[CACHE] Saving "' + key + '", TTL: ' + (ttl / 1000) + 's');

            store.set(key, { value: value, ttl: ttl, time: (new Date()).getTime() });
        },
        get: function(key) {
            var data = store.get(key);

            // Check if data is found
            if (!data) {
                $log.debug('[CACHE] "' + key + '" not found');

                return null;
            }

            // Check if the entry has expired
            if (data.ttl > 0 && (new Date()).getTime() - data.time > data.ttl) {
                $log.debug('[CACHE] "' + key + '" expired');

                return null;
            }

            // It's a valid entry
            $log.debug('[CACHE] "' + key + '" found');

            return data.value;
        },
        getOld: function (key) {
            var data = store.get(key);

            // Check if data is found
            if (!data) {
                $log.debug('[CACHE] Old "' + key + '" not found');

                return null;
            }

            // It's a valid entry
            $log.debug('[CACHE] Old "' + key + '" found');

            return data.value;
        }
    };
}]);
