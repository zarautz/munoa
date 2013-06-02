'use strict';
/*global App */

App.config(['$routeProvider', 'menuProvider', function($routeProvider, menuProvider) {
    angular.forEach(menuProvider.$get().getItems(), function(item){
        $routeProvider.when(item.path, { templateUrl: item.templateUrl });
    });

    $routeProvider.otherwise({ redirectTo: '/' });
}]);
