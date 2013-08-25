'use strict';

Z.app.controller('NavigationController', ['$scope', '$location', '$timeout', 'menu', function ($scope, $location, $timeout, menu) {
    this.location = $location;
    this.menu = menu;
    this.activeView = this.activeContent = 1;
    this.viewHasTransitioned = true;
    $scope.menu = this.menu;

    $scope.$on('$routeChangeSuccess', function(event) {
        $scope.menu.setIsActive(false);
    });

    this.activateView = function(viewToActivate, isPush, template, data) {
        var that = this;

        // Prevent moving between views when menu is open
        if (this.menu.isActive()) {
            this.toggleMenu();

            return false;
        }

        // Prevent double click
        if (!this.viewHasTransitioned || viewToActivate === this.activeView) {
            return false;
        } else {
            this.activeView = viewToActivate;
            this.viewHasTransitioned = false;

            // push needs data...
            if (isPush) {
                this.activeContent = viewToActivate;
                
                data._activeView = viewToActivate; // Attach it to use in the view
                $scope['view' + viewToActivate] = template;
                $scope.pushData = data;
            }
        }

        $timeout(function () {
            that.viewHasTransitioned = true;

            // ...and pop needs little hack for scrolling issue
            if (!isPush) {
                that.activeContent = viewToActivate;
            }
        }, 200);
    };

    this.popView = function() {
        this.activateView(this.activeView - 1, false);
    };

    this.pushView = function(template, data) {
        this.activateView(this.activeView + 1, true, template, data);
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
