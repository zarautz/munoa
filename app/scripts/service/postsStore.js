'use strict';

Z.app.factory('postsStore', ['cache', 'apiInterface', '$q', function(cache, apiInterface, $q) {
    var PostsStore = new Z.DataStore('posts', cache, $q);

    PostsStore.addMethod('getZuZarautzPosts', function () {
        return apiInterface.getZuZarautzPosts();
    }, function (apiResponse) {
        return apiResponse.data.data;
    });

    return PostsStore;
}]);
