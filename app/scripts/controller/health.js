'use strict';

Z.app.controller('HealthController', ['placesMapper', 'settings', function(placesMapper, settings) {
    this.refresh = function () {
        this.types = [
            'dentist',
            'doctor',
            //'health',
            'health_center',
            'optician',
            'pharmacy',
            'physiotherapist',
            'podologist',
            'psychologist',
            'urgent_care'
        ];

        var places = placesMapper.get({
            'language': settings.get('language'),
            'types': this.types.join(',')
        });

        this.places = places.promise;
        this.status = places.status;
    };

    this.refresh();
}]);
