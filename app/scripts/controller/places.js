'use strict';

Z.app.controller('PlacesController', ['$routeParams', '$scope', 'placesMapper', 'placesConfig', 'settings', function($routeParams, $scope, placesMapper, placesConfig, settings) {
    this.refresh = function () {
        this.section = $routeParams.section;
        this.groups  = placesConfig.getSection(this.section).getGroups(settings.get('profile'));

        /*var places = placesMapper.get({
            'language': settings.get('language'),
            'types': this.types.join(',')
        });

        this.places = places.promise;
        this.status = places.status;*/
    };

    this.refresh();
}]);
