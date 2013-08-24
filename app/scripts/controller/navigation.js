'use strict';

Z.app.controller('NavigationController', ['$scope', '$location', '$route', '$timeout', 'menu', function ($scope, $location, $route, $timeout, menu) {
    this.menu = menu;
    this.activeView = this.activeContent = 1;
    $scope.menu = this.menu;

    $scope.$on('$routeChangeSuccess', function(event) {
        $scope.menu.setIsActive(false);
    });

    this.getClassForPath = function(path, cssClass) {
        return $location.path() === path ? cssClass : '';
    };

    this.popView = function() {
        var that = this;

        this.activeView--;

        // This seems a hack, but works for cleaning scroll status
        // CSS animation is 0.2s, so 250 should be OK
        $timeout(function () {
            that.activeContent--;
        }, 250);
    };

    this.pushView = function(template, data) {
        if (this.menu.isActive()) {
            this.toggleMenu();

            return false;
        }

        this.activeView++;
        this.activeContent++;
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

    this.reload = function() {
        $route.reload();
    };
}]);
