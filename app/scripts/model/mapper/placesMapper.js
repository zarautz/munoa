'use strict';

Z.app.factory('placesMapper', ['$q', 'placesSource', 'placeTypesSource', function ($q, placesSource, placeTypesSource) {
    var placesMapper = new Z.DataMapper($q);

    placesMapper.setSources([placesSource, placeTypesSource]);
    placesMapper.setMapperCb(function (values) {
        var places = [],
            i, j, types, place;

        for (i = 0; i < values[0].length; i++) {
            place = values[0][i];
            types = [];

            // Types
            for (j = 0; j < place.types.length; j++) {
                types.push(new Z.Model.PlaceType({
                    'code': place.types[j],
                    'name': values[1].data[place.types[j]].name
                }));
            }

            place.types = types;

            // Longitude, Latitude            
            place.location = new Z.Model.Point(place.geometry.coordinates[0], place.geometry.coordinates[1]);
            delete place.geometry;

            // Create object
            places.push(new Z.Model.Place(place));
        }

        return new Z.Model.PlaceCollection(places);
    });

    return placesMapper;
}]);
