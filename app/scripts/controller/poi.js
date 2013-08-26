'use strict';

Z.app.controller('PoiController', ['placesMapper', 'settings', function(placesMapper, settings) {
    this.refresh = function () {
        this.types = [
            'health',
            'wifi',
            'atm',
            'stores',
            'parking',
            'sports',
            'transport',
            'recycling',
            'gastronomy',
            'lodging'
        ];

        /*var places = placesMapper.get({
            'language': settings.get('language'),
            'types': this.types.join(',')
        });

        this.places = places.promise;
        this.status = places.status;*/
    };

    this.refresh();
}]);
