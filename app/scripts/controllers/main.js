'use strict';

//
// NavigationController
//

App.controller('NavigationController', ['$scope', '$location', 'menu', function ($scope, $location, menu) {
    this.menu  = menu;
    this.activeView = 1;
    
    this.reorderMenuItems = function() { // TEST
        this.menu.items.reverse();
    };
    
    this.toggleMenu = function() {
        this.menu.isActive = ! this.menu.isActive;
    };
    
    this.openSection = function(path) {
        $location.path(path);
        this.menu.isActive = false;
    };
    
    this.getClassForPath = function(path, cssClass) {
        return $location.path() === path ? cssClass : '';
    };
    
    this.pushView = function(template, data) {
        if (this.menu.isActive) {
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
