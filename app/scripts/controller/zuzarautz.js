'use strict';

Z.app.controller('ZuzarautzController', ['$scope', 'zuZarautzMapper', function($scope, zuZarautzMapper) {
    this.refresh = function () {
        var posts = zuZarautzMapper.get();

        this.posts  = posts.promise;
        this.status = posts.status;
    };

    // Init
    this.refresh();
}]);