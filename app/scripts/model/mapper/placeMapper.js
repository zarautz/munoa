'use strict';

Z.app.factory('placeMapper', ['$q', 'placeSource', 'placeTypesSource', function ($q, placeSource, placeTypesSource) {
    var placeMapper = new Z.DataMapper($q);

    placeMapper.setSources([placeSource, placeTypesSource]);
    placeMapper.setMapperCb(function (values) {
        var place = values[0].data,
            types = [],
            i;

        // Types
        for (i = 0; i < place.types.length; i++) {
            types.push(new Z.Model.PlaceType({
                'code': place.types[i],
                'name': values[1].data[place.types[i]].name
            }));
        }

        place.types = types;

        // Longitude, Latitude            
        place.location = new Z.Model.Point(place.geometry.coordinates[0], place.geometry.coordinates[1]);
        delete place.geometry;

        return new Z.Model.Place(place);
    });

    return placeMapper;
}]);
