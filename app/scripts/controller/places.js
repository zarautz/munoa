'use strict';

Z.app.controller('PlacesController', ['$routeParams', '$scope', 'placesMapper', 'settings', function($routeParams, $scope, placesMapper, settings) {
    var place = {
        'health': {
            'groups': [
                'health'
                /*
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
                */
            ]
        },
        'places': {
            'groups': [
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
            ]
        },
        'poi': {
            'groups':[
                'atm'
            ]
        }
    };

    this.refresh = function () {
        this.section = $routeParams.section;
        this.groups  = place[this.section].groups;

        /*var places = placesMapper.get({
            'language': settings.get('language'),
            'types': this.types.join(',')
        });

        this.places = places.promise;
        this.status = places.status;*/
    };

    this.refresh();
}]);
