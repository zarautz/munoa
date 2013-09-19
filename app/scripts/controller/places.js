'use strict';

Z.app.controller('PlacesController', ['$routeParams', '$scope', 'pharmaciesMapper', 'placesConfig', 'settings', 'phonegap', function($routeParams, $scope, pharmaciesMapper, placesConfig, settings, phonegap) {
    this.refresh = function () {
        this.section = $routeParams.section;
        this.groups  = placesConfig.getSection(this.section).getGroups(settings.get('profile'));

        // Get pharmacies on duty
        if (this.section === 'health') {
            var pharmacies = pharmaciesMapper.get(),
                hour = +moment().format('H');

            this.geolocation = phonegap.geolocation;
            this.pharmacies = pharmacies.promise;
            this.status = pharmacies.status;

            this.inHour = function(period) {
                return hour >= period.from && hour < period.to;
            };
        }
    };

    this.refresh();
}]);
