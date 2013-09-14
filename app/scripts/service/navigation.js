'use strict';

Z.app.factory('navigation', ['$location', '$rootScope', '$timeout', 'menu', function($location, $rootScope, $timeout, menu) {
    var navigation = {},
        dataStack = [],
        cssTransitionDuration = 300;  // Actual transition is 200

    // Watch routeChange
    $rootScope.$on('$routeChangeSuccess', function() {
        menu.setIsActive(false);
    });

    //
    // Vars
    // 
    navigation.menu = menu;
    navigation.location = $location;
    navigation.activeView = 1;
    navigation.asideIsActive = false;
    navigation.asideIsInTransition = false;
    navigation.menuIsInTransition = false;
    navigation.viewIsInTransition = false;
    navigation.gesturesAreDisabled = false;

    //
    // Methods
    //
    navigation.activateView = function(viewToActivate, isPush, template, data) {
        var that = this;

        // Prevent double click or clicks during CSS transitions
        if (this.viewIsInTransition ||
            this.menuIsInTransition ||
            this.asideIsInTransition ||
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
            dataStack.push(data);

            $rootScope['view' + viewToActivate] = template;
            $rootScope.pushData = data;
        } else {
            $rootScope.pushData = dataStack.pop();
        }

        $timeout(function () {
            that.viewIsInTransition = false;
            // Hide aside and reset gestures
            that.asideIsActive = false;
            that.gesturesAreDisabled = false;

            if (!isPush) {
                $rootScope['view' + (viewToActivate + 1)] = '';
            }
        }, cssTransitionDuration);
    };

    navigation.contentIsAlive = function(view) {
        return this.activeView >= view ||
            (this.viewIsInTransition && this.activeView === (view - 1));
    };

    navigation.popView = function() {
        this.activateView(this.activeView - 1, false);
    };

    navigation.pushView = function(template, data) {
        this.activateView(this.activeView + 1, true, template, data);
    };

    navigation.toggleAside = function() {
        var that = this;

        this.asideIsInTransition = true;
        this.asideIsActive = !this.asideIsActive;
        this.gesturesAreDisabled = !this.gesturesAreDisabled;

        $timeout(function () {
            that.asideIsInTransition = false;
        }, cssTransitionDuration);
    };

    navigation.toggleMenu = function() {
        var that = this;

        this.menuIsInTransition = true;
        menu.toggleIsActive();

        $timeout(function () {
            that.menuIsInTransition = false;
        }, cssTransitionDuration);
    };

    navigation.swipe = function(direction) {
        if (this.gesturesAreDisabled) {
            return false;
        }

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

    navigation.openExternalLink = function(url) {
        window.open(url, '_system');
    };

    navigation.toHomepage = function() {
        this.activeView = 1;
        $location.path(menu._items[1].path);
    };

    return navigation;
}]);
