'use strict';

Z.app.factory('api', ['apiHost', '$http', '$q', function(apiHost, $http, $q) {
    return {
        getPlaceFirstPage: function (params) {
            if (params.language === undefined) {
                throw 'Language must be defined';
            }

            if (params.types === undefined) {
                throw 'Types must be defined';
            }

            return this.getPlaces({
                language: params.language,
                types: params.types,
                offset: 0,
                limit: params.limit
            });
        },
        getAllPlaces: function (params) {
            var deferred  = $q.defer(),
                that      = this,
                pageCount = 50;

            // Set limit for first request
            params.limit = pageCount;

            // Get the first page to see the totalCount
            this.getPlaceFirstPage(params).then(function (firstPageResponse) {
                var total    = firstPageResponse.meta.totalCount,
                    pages    = Math.ceil(total / pageCount),
                    promises = [],
                    i, offset, limit, firstPageDefer;

                // First page promise
                firstPageDefer = $q.defer();
                firstPageDefer.resolve(firstPageResponse);
                promises.push(firstPageDefer.promise);

                // Make a request for the rest of the pages
                if (pages > 1) {
                    for (i = 1; i < pages; i++) {
                        offset = i * pageCount;
                        limit  = pageCount;

                        promises.push(that.getPlaces({
                            language: params.language,
                            types: params.types,
                            offset: offset,
                            limit: limit
                        }));
                    }
                }

                // When all the pages are loaded, merge them in an array
                $q.all(promises).then(function (values) {
                    var result = [],
                        i;

                    for (i = 0; i < values.length; i++) {
                        result = result.concat(values[i].data);
                    }

                    // Resolve with the merged array
                    deferred.resolve(result);
                }, function (reason) {
                    deferred.reject(reason);
                });
            }, function (reason) {
                deferred.reject(reason);
            });

            return deferred.promise;
        },
        getEvent: function (id) {
            return $http({
                method: 'GET',
                url: apiHost + '/events/' + id
            }).then(function (response) {
                return response.data;
            });
        },
        getEvents: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/events'
            }).then(function (response) {
                return response.data;
            });
        },
        getForecast: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/forecast'
            }).then(function (response) {
                return response.data;
            });
        },
        getWeatherCodes: function (params) {
            return $http({
                method: 'GET',
                params: {'language': params.language},
                url: apiHost + '/forecast/weather/codes'
            }).then(function (response) {
                return response.data;
            });
        },
        getPlace: function (params) {
            return $http({
                method: 'GET',
                params: {'language': params.language},
                url: apiHost + '/places/' + params.id
            }).then(function (response) {
                return response.data;
            });
        },
        getPlaceTypes: function (params) {
            return $http({
                method: 'GET',
                params: {'language': params.language},
                url: apiHost + '/places/types'
            }).then(function (response) {
                return response.data;
            });
        },
        getPlaces: function (params) {
            return $http({
                method: 'GET',
                params: params,
                url: apiHost + '/places'
            }).then(function (response) {
                return response.data;
            });
        },
        getZuZarautzPosts: function () {
            return $http({
                method: 'GET',
                url: apiHost + '/posts/zuzarautz'
            }).then(function (response) {
                return response.data;
            });
        }
    };
}]);
