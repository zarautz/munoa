'use strict';

Z.app.controller('ZuzarautzController', ['$scope', '$timeout', 'zuZarautzMapper', function($scope, $timeout, zuZarautzMapper) {
    this.refresh = function () {
        var posts = zuZarautzMapper.get();

        this.posts  = posts.promise;
        this.status = posts.status;
    };

    this.refresh();
}]);