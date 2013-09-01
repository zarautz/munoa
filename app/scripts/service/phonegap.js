'use strict';

Z.app.factory('phonegap', ['$q', function($q) {
    var deviceready = $q.defer();

    document.addEventListener('deviceready', function () {
        console.debug('[PHONEGAP] Device ready');
        deviceready.resolve();
    }, function () {
        console.error('[PHONEGAP] Device ready failed');
    });

    return {
        init: function () {
            // Placeholder, do not delete
        },
        onDeviceReady: function () {
            return deviceready.promise;
        }
    };
}]);
