'use strict';

Z.app.controller('NavigationController', ['$scope', '$location', 'menu', function ($scope, $location, menu) {
    this.menu = menu;
    this.activeView = 1;
    $scope.menu = this.menu;

    $scope.$on('$routeChangeSuccess', function(event) {
        $scope.menu.setIsActive(false);
    });

    this.getClassForPath = function(path, cssClass) {
        return $location.path() === path ? cssClass : '';
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
            this.popView();
        }
    };
}]);
