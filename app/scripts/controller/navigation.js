'use strict';

Z.app.controller('NavigationController', ['$scope', '$location', 'menu', function ($scope, $location, menu) {
    this.menu = menu;
    this.activeView = 1;

    this.getClassForPath = function(path, cssClass) {
        return $location.path() === path ? cssClass : '';
    };

    this.openSection = function(path) {
        $location.path(path);
        this.menu.setIsActive(false);
    };

    this.popView = function() {
        this.activeView--;
    };

    this.pushView = function(template, data) {
        if (this.menu.isActive()) {
            this.toggleMenu();

            return false;
        }

        this.activeView++;
        $scope['view' + this.activeView] = template;
        $scope.pushData = data;
    };

    this.toggleMenu = function() {
        this.menu.toggleIsActive();
    };

    this.swipe = function(direction) {
        if (this.activeView === 1) {
            if (this.menu.isActive() && direction === 'left') {
                this.menu.setIsActive(false);
            } else if (!this.menu.isActive() && direction === 'right') {
                this.menu.setIsActive(true);
            }
        } else if (direction === 'right') {
            this.activeView--;
        }
    };
}]);
