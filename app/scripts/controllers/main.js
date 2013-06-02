'use strict';
/*global App */

//
// NavigationController
//

App.controller('NavigationController', ['$scope', '$location', 'menu', function ($scope, $location, menu) {
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
}]);

//
// EventController
//

App.controller('EventController', ['$http', function($http) {
    var that = this;

    this.events = [];

    $http.get('https://api.mongolab.com/api/1/databases/test/collections/events?apiKey=dkMj2ThNCU6RgwGFscKEpWkJ-wxOeB3S')
        .then(function(response) {
            that.events = response.data;
        }
    );
}]);

//
// SettingController
//

App.controller('SettingController', ['menu', function(menu) {
    this.settings = {
        locale: {
            id: 'locale',
            title: 'Language',
            selectedKey: 'eu',
            options: {
                eu: 'Euskara',
                es: 'Castellano',
                en: 'English',
                fr: 'Française'
            }
        },
        profile: {
            id: 'profile',
            title: 'Profile',
            selectedKey: 'tourist',
            options: {
                tourist: 'Tourist',
                zarautz: 'Zarauztarra'
            }
        }
    };

    this.updateSetting = function(setting, key) {
        if (setting.id == 'profile') {
            menu.reorderItems(key);
        }

        setting.selectedKey = key;
    };
}]);
