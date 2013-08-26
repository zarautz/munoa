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

            for (j = 0; j < place.types.length; j++) {
                types.push(new Z.Model.PlaceType({
                    'code': place.types[j],
                    'name': values[1].data[place.types[j]].name
                }));
            }

            place.types = types;
            places.push(new Z.Model.Place(place));
        }

        return new Z.Model.PlaceCollection(places);
    });

    return placesMapper;
}]);
