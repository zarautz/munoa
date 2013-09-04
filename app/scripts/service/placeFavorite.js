'use strict';

Z.app.factory('placeFavorite', ['cache', function(cache) {
    var favorites = {},
        cacheKey  = '[placeFavorites]',
        cacheData;

    // Load from cache
    cacheData = cache.get(cacheKey);

    if (cacheData) {
        favorites = cacheData;
    }

    return {
        toggle: function (id) {
            if (this.isFavorite(id)) {
                delete favorites[id];
            } else {
                favorites[id] = true;
            }

            // Save to cache
            cache.set(cacheKey, favorites);
        },
        isFavorite: function (id) {
            return typeof favorites[id] !== 'undefined';
        }
    };
}]);
