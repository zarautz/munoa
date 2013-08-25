'use strict';

Z.app.controller('NavigationController', ['$scope', '$location', '$timeout', 'menu', function ($scope, $location, $timeout, menu) {
    this.location = $location;
    this.menu = menu;
    this.activeView = this.activeContent = 1;
    this.viewHasTransitioned = true;

    $scope.$on('$routeChangeSuccess', function(event) {
        menu.setIsActive(false);
    });

    this.activateView = function(viewToActivate, isPush, template, data) {
        var that = this,
            cssTransitionDuration = 200;

        // Prevent double click or clicks during CSS transitions
        if (!this.viewHasTransitioned || this.activeView === viewToActivate) {
            return false;
        }

        // Prevent moving between views when menu is open
        if (menu.isActive()) {
            this.toggleMenu();
            this.viewHasTransitioned = false;
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
        }, cssTransitionDuration);
    };

    this.popView = function() {
        this.activateView(this.activeView - 1, false);
    };

    this.pushView = function(template, data) {
        this.activateView(this.activeView + 1, true, template, data);
    };

    this.toggleMenu = function() {
        menu.toggleIsActive();
    };

    this.swipe = function(direction) {
        if (this.activeView === 1) {
            if (menu.isActive() && direction === 'left') {
                menu.setIsActive(false);
            } else if (!menu.isActive() && direction === 'right') {
                menu.setIsActive(true);
            }
        } else if (direction === 'right') {
            this.popView();
        }
    };
}]);
