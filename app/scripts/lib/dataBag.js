'use strict';

Z.DataBag = function DataBag(cache, $q, cacheKey) {
    this._$q       = $q;
    this._cache    = cache;
    this._cacheKey = cacheKey || ('key.' + Math.random());
    this._status   = {};
    this._initCb   = function (data) { return data; };

    this._reset();
}

Z.DataBag.prototype._reset = function () {
    this._data = this._$q.defer();

    this._status.isError   = false;
    this._status.fromCache = false;
    this._status.isDone    = false;
    this._status.isOld     = false;
    this._status.isLoading = false;
};

Z.DataBag.prototype._resolve = function (value) {
    this._status.isDone = true;
    this._status.isLoading = false;
    this._data.resolve(this._initCb(value));
};

Z.DataBag.prototype._resolveWithCache = function (value) {
    this._status.fromCache = true;
    this._resolve(value);
};

Z.DataBag.prototype._resolveWithOldCache = function (value) {
    this._status.isOld = true;
    this._resolveWithCache(value);
};

Z.DataBag.prototype.get = function () {
    return this._data.promise;
};

Z.DataBag.prototype.getStatus = function () {
    return this._status;
};

Z.DataBag.prototype.isResolved = function () {
    return this._data.promise.$$v !== undefined;
};

Z.DataBag.prototype.isValid = function () {
    // There has been an error
    // It's old data
    // It's not done and is not loading
    if (this._status.isError ||
        this._status.isOld ||
        (!this._status.isDone && !this._status.isLoading)
    ) {
        return false;
    }

    // Check if the cache is valid
    if (!this._cache.get(this._cacheKey) && !this._status.isLoading) {
        return false;
    }

    return true;
};

Z.DataBag.prototype.load = function (dataPromiseCb) {
    // Check that it's a cb
    if (!angular.isFunction(dataPromiseCb)) {
        throw "DataBag::load needs a callback function as the argument";
    }

    // Reset the DataBag
    this._reset();
    
    // We're waiting to the dataPromise
    this._status.isLoading = true;

    // Check the cache
    var cacheData = this._cache.get(this._cacheKey);

    if (cacheData) {
        this._resolveWithCache(cacheData);
    } else {
        // Get the data promise
        var dataPromise = dataPromiseCb();
        var that = this;
      
        // Check if it's a promise, duck typing :-)
        if (!('catch' in dataPromise && 'finally' in dataPromise && 'then' in dataPromise)) {
            throw "DataBag::load needs a promise as the argument";
        }
  
        // When the promise is done
        dataPromise.then(function (data) {
            that._resolve(data);
            that._cache.set(that._cacheKey, data, 20);
        }, function (reason) {
            // Set the error status
            that._status.isError = true;
    
            // Try to get some old data
            var cacheData = that._cache.getOld(that._cacheKey);
    
            if (cacheData) {
                that._resolveWithOldCache(cacheData);
            } else {
                that._data.reject(reason);
            }
        });
    }
}

Z.DataBag.prototype.setInitCb = function (initCb) {
    this._initCb = initCb;
}
