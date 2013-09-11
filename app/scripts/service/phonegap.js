'use strict';

Z.app.factory('phonegap', ['$q', '$timeout', function($q, $timeout) {
    var deviceready = $q.defer(),
        service     = {
            connection: false,
            geolocation: {
                available: false
            },
            onDeviceReady: function () {
                return deviceready.promise;
            }
        };

    //
    // Init Phonegap
    //
    document.addEventListener('deviceready', function () {
        console.debug('[PHONEGAP] Device ready');
        deviceready.resolve();
        service.connection = navigator.connection.type;
    }, function () {
        console.error('[PHONEGAP] Device ready failed');
    });

    //
    // Update phone data
    //
    function updateData() {
        console.debug('[PHONEGAP] GeoLocation: ', service.geolocation.available === false ? false : [service.geolocation.longitude, service.geolocation.latitude]);
        console.debug('[PHONEGAP] Connection: ', service.connection);

        service.onDeviceReady().then(function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                service.geolocation = new Z.Model.Point(position.coords.longitude, position.coords.latitude);
                service.geolocation.available = true;
            }, function () {
                service.geolocation.available = false;
            });
        }, function () {
            service.geolocation.available = false;
        });

        // Check position every 10 secs
        $timeout(updateData, 10000);

        return '';
    }

    updateData();

    //
    // Return Service
    //
    return service;
}]);
