'use strict';

Z.app.directive('munoaMap', ['navigation', 'phonegap', 'babel', function (navigation, phonegap, babel) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var latitude,
                longitude,
                map, bounds, latLng, marker, userMarker,
                geolocation = phonegap.geolocation,
                buildMap;

            buildMap = function() {
                latitude = parseFloat(attrs.latitude, 10) || 43;
                longitude = parseFloat(attrs.longitude, 10) || 2;
                latLng = new google.maps.LatLng(latitude, longitude);

                map = new google.maps.Map(element[0], {
                    zoom: 16,
                    center: latLng,
                    mapTypeControl: false,
                    zoomControl: false,
                    streetViewControlOptions: {
                        position: google.maps.ControlPosition.BOTTOM_CENTER
                    },
                    maxZoom: 19
                });

                marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });

                // Set user marker if we have location
                if (geolocation.available) {
                    userMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(geolocation.latitude, geolocation.longitude),
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

                    // Set bounds
                    bounds = new google.maps.LatLngBounds();
                    bounds.extend(marker.getPosition());
                    bounds.extend(userMarker.getPosition());
                    map.fitBounds(bounds);
                }

                // Capture links
                google.maps.event.addListener(map, 'tilesloaded', function() {
                    element.find('a').on('click', function(event) {
                        event.preventDefault();
                        navigation.openExternalLink(angular.element(this).attr('href'));
                    });
                });
            };

            if (typeof google === 'object' && typeof google.maps === 'object') {
                attrs.$observe('latitude', buildMap);
                attrs.$observe('longitude', buildMap);
            } else {
                element.append(angular.element('<p class="big-message"><i class="icon-attention"></i>'+ babel.translate('error.gmaps') +'</p>'));
            }
        }
    };
}]);
