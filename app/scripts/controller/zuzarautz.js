'use strict';

Z.app.controller('ZuzarautzController', ['$scope', 'PostsStore', function($scope, PostsStore) {
    $scope.refresh = function () {
        $scope.posts = PostsStore.getZuZarautzPosts();
    }

    // Init
    $scope.refresh();
}]);