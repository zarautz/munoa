'use strict';

Z.app.controller('ZuzarautzController', ['$scope', 'zuZarautzMapper', function($scope, zuZarautzMapper) {
    $scope.refresh = function () {
        var posts = zuZarautzMapper.get();

        $scope.posts  = posts.promise;
        $scope.status = posts.status;
    }

    // Init
    $scope.refresh();
}]);