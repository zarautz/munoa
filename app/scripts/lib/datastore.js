'use strict';

Z.DataStore = function DataStore(cacheKey, cache, q) {
    this.cache    = cache;
    this.cacheKey = cacheKey;
    this.q        = q;
}

Z.DataStore.Result = function () {
    this.isError   = false;
    this.fromCache = false;
    this.isLoaded  = false;
    this.isOld     = false;
    this.response  = null;
}

// A function parameter can't be called "arguments" in strict mode
// So we call it args
Z.DataStore.prototype.generateCacheKey = function (method, args) {
    // http://stackoverflow.com/questions/2091138/why-doesnt-join-work-with-function-arguments
    var args = Array.prototype.slice.call(args);

    return this.cacheKey + '.' + method.toLowerCase() + (args.length > 0 ? angular.toJson(args) : '');
}

Z.DataStore.prototype.addMethod = function (method, requestCb, processCb, resultObj) {
    var that = this;

    this[method] = function () {
        var cacheKey = that.generateCacheKey(method, arguments),
            result = resultObj || Z.DataStore.Result,
            cacheData,
            requestPromise;

        // Initialize result
        result = new result();

        // Get cache
        cacheData = that.cache.get(cacheKey);

        // Cache exists?
        if (cacheData) {
            // Create the promise
            var deferred = that.q.defer();

            // Get cache data and set result defaults
            result.response  = deferred.promise;
            result.fromCache = true;
            result.isLoaded  = true;

            // Resolve deferred
            deferred.resolve(cacheData);

            return result;
        }

        // Call the request CB with the given argument and DataStore context
        // It should return a promise
        requestPromise = requestCb.apply(that, arguments);

        // Check it's a promise?
        // ...

        // On request success
        result.response = requestPromise.then(function (value) {
            //
            // ON SUCCESS
            //
            // Process value with processCb
            var data = processCb(value) || null;
            result.isLoaded = true;

            // Cache data
            that.cache.set(cacheKey, data, 10);

            return data;
        }, function () {
            //
            // ON ERROR
            //
            result.isError  = true;
            result.isLoaded = true;

            // Try to get some old data
            var cacheData = that.cache.getOld(cacheKey);

            if (cacheData) {
                // Create the promise
                var deferred = that.$q.defer();
                deferred.resolve(cacheData);

                // Set values
                result.fromCache = true;
                result.isOld     = true;
                result.response  = deferred.promise;
            }
        });

        return result;
    };
}
