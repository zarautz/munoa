'use strict';

App.config(['$routeProvider', 'menuProvider', function($routeProvider, menuProvider) {
    angular.forEach(menuProvider.$get().items, function(item){
        $routeProvider.when(item.path, { templateUrl: item.templateUrl });
    });
    
    $routeProvider.otherwise({ redirectTo: '/' });
}]);
