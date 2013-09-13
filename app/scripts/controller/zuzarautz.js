'use strict';

Z.app.controller('ZuzarautzController', ['$scope', '$timeout', 'zuZarautzMapper', 'settings', function($scope, $timeout, zuZarautzMapper, settings) {
    
    this.refresh = function () {
        var posts = zuZarautzMapper.get();

        this.posts  = posts.promise;
        this.status = posts.status;
        this.zarauztarra = settings.get('profile') === 'zarautz';
    };

    this.refresh();
}]);