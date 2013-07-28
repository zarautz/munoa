'use strict';

Z.app.controller('PostController', ['post', function(post) {
    this.posts = post.findAll();
}]);
