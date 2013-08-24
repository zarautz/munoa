'use strict';

Z.app.factory('PostsStore', ['api', 'cache', '$q', function (api, cache, $q) {
    function PostsStore(api, zuzarautz) {
        this._api       = api;
        this._zuzarautz = zuzarautz;
    }

    PostsStore.prototype._fetchZuzarautz = function () {
        if (!this._zuzarautz.isValid()) {
            var that = this;

            // Set a promise for the data, this will only be called 
            // if there is not valid cache
            this._zuzarautz.load(function () {
                return that._api.getZuZarautzPosts();
            });
        }
    
        return this._zuzarautz.get();
    };
  
    PostsStore.prototype.getStatus = function () {
        return this._zuzarautz.getStatus();
    };

    PostsStore.prototype.getMeta = function () {
        return this._fetchZuzarautz().then(function (response) {
            return response.meta;
        });
    }
  
    PostsStore.prototype.getZuZarautzPosts = function () {
        return this._fetchZuzarautz().then(function (response) {
            return response.data;
        });
    };
  
    return new PostsStore(api, new Z.DataBag(cache, $q, 'posts.zuzarautz'));
}]);
