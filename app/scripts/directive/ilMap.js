'use strict';

Z.app.directive('ilMap', ['geolocation', function (geolocation) {
    return function (scope, elem, attrs) {
        var latitude,
            longitude,
            map, bounds, latLng, marker1, marker2,
            buildMap,
            userLatitude = geolocation.getCurrentPosition().location.latitude,
            userLongitude = geolocation.getCurrentPosition().location.longitude,
            latLng,
            userLatLng = new google.maps.LatLng(userLatitude, userLongitude),
            fakeLat, fakeLng;

        buildMap = function() {
            latitude = parseFloat(attrs.latitude, 10) || 43;
            longitude = parseFloat(attrs.longitude, 10) || 2;
            latLng = new google.maps.LatLng(latitude, longitude);
            bounds = new google.maps.LatLngBounds();

            map = new google.maps.Map(elem[0], {
                zoom: 10,
                center: new google.maps.LatLng(0, 0),
                mapTypeControl: false,
                maxZoom: 18
            });
            marker1 = new google.maps.Marker({
                position: latLng,
                map: map
            });
            marker2 = new google.maps.Marker({
                position: userLatLng,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillOpacity: 0.5,
                    fillColor: '0099cc',
                    strokeOpacity: 1.0,
                    strokeColor: '0099cc',
                    strokeWeight: 3.0, 
                    scale: 10 //pixels
                }
            });

            // Calculate fake point for bounding
            fakeLat = userLatitude - (latitude - userLatitude);
            fakeLng = userLongitude - (longitude - userLongitude);

            bounds.extend(new google.maps.LatLng(fakeLat, fakeLng));
            bounds.extend(marker1.getPosition());
            map.fitBounds(bounds);

            // Set center
            map.setCenter(userLatLng);
        }

        attrs.$observe('latitude', buildMap);
        attrs.$observe('longitude', buildMap);
    };
}]);
