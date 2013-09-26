'use strict';

Z.app.controller('InfoController', ['$scope', '$timeout', 'placeMapper', 'placeFavorite', 'settings', 'phonegap', function($scope, $timeout, placeMapper, placeFavorite, settings, phonegap) {
    this.toggleFavorite = function (id) {
        this.favorite.toggle(id);
    };

    this.refresh = function () {
        var place = placeMapper.get({'language': settings.get('language'), 'id': 601 });

        this.favorite    = placeFavorite;
        this.status      = place.status;
        this.place       = place.promise;
        this.geolocation = phonegap.geolocation;
        this.zarauztarra = settings.get('profile') === 'zarautz';
        this.language    = settings.get('language');
    };

    this.refresh();
}]);
