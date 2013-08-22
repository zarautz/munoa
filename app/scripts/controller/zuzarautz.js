'use strict';

Z.app.controller('ZuzarautzController', ['$scope', 'postsStore', function($scope, postsStore) {
    $scope.refresh = function () {
        $scope.posts = postsStore.getZuZarautzPosts();
    }

    // Init
    $scope.refresh();
}]);