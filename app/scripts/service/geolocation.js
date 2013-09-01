'use strict';

Z.app.factory('geolocation', ['$q', '$timeout', 'phonegap', function($q, $timeout, phonegap) {
    var currentPosition = {
        location: false
    };

    function fetchCurrentPosition() {
        console.debug('[PHONEGAP] GeoLocation: ', currentPosition.location);

        phonegap.onDeviceReady().then(function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                currentPosition.location = new Z.Model.Point(position.coords.longitude, position.coords.latitude);
            }, function () {
                currentPosition.location = false;
            })
        }, function () {
            currentPosition.location = false;
        });

        // Check position every 30 secs
        $timeout(fetchCurrentPosition, 30000);

        return '';  
    }

    fetchCurrentPosition();

    return {
        getCurrentPosition: function () {
            return currentPosition;
        }
    };
}]);
