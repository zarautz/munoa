'use strict';

Z.app.controller('NavigationController', ['$scope', '$location', 'menu', function ($scope, $location, menu) {
    this.menu = menu;
    this.activeView = 1;

    this.toggleMenu = function() {
        this.menu.toggleIsActive();
    };

    this.openSection = function(path) {
        $location.path(path);
        this.menu.setIsActive(false);
    };

    this.getClassForPath = function(path, cssClass) {
        return $location.path() === path ? cssClass : '';
    };

    this.pushView = function(template, data) {
        if (this.menu.isActive()) {
            this.toggleMenu();

            return false;
        }

        $scope['view' + (this.activeView + 1)] = template;
        $scope.pushData = data;

        this.activeView++;
    };

    this.popView = function() {
        this.activeView--;
    };

    this.toggleProfile = function () {
        if (this.menu.getProfile() == 'zarautz') {
            this.menu.setProfile('tourist');
        } else {
            this.menu.setProfile('zarautz');
        }
    };
}]);
