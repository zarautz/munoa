'use strict';

Z.app.controller('NavigationController', ['$scope', '$location', '$timeout', 'menu', function ($scope, $location, $timeout, menu) {
    var that = this,
        cssTransitionDuration = 300; // Actual transition is 200

    this.location = $location;
    this.menu = menu;
    this.activeView = 1;
    this.menuIsInTransition = false;
    this.viewIsInTransition = false;

    $scope.dataStack = [];

    $scope.$on('$routeChangeSuccess', function() {
        menu.setIsActive(false);
    });

    this.activateView = function(viewToActivate, isPush, template, data) {
        // Prevent double click or clicks during CSS transitions
        if (this.viewIsInTransition ||
            this.menuIsInTransition ||
            this.activeView === viewToActivate) {
            return false;
        }

        // Prevent moving between views when menu is open
        if (menu.isActive()) {
            this.toggleMenu();

            return false;
        }

        // Start transition
        this.viewIsInTransition = true;
        this.activeView = viewToActivate;

        // push needs data...
        if (isPush) {
            $scope['view' + viewToActivate] = template;
            $scope.dataStack.push(data);
            $scope.pushData = data;
        } else {
            $scope.pushData = $scope.dataStack.pop();
        }

        $timeout(function () {
            that.viewIsInTransition = false;

            if (!isPush) {
                $scope['view' + (viewToActivate + 1)] = '';
            }
        }, cssTransitionDuration);
    };

    this.contentIsAlive = function(view) {
        return this.activeView >= view ||
            (this.viewIsInTransition && this.activeView === (view - 1));
    };

    this.popView = function() {
        this.activateView(this.activeView - 1, false);
    };

    this.pushView = function(template, data) {
        this.activateView(this.activeView + 1, true, template, data);
    };

    this.toggleMenu = function() {
        this.menuIsInTransition = true;
        menu.toggleIsActive();

        $timeout(function () {
            that.menuIsInTransition = false;
        }, cssTransitionDuration);
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

    this.openExternalLink = function(url) {
        window.open(url, '_system');
    };
}]);
