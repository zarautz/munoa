'use strict';

Z.DataSource = function DataSource(cache, $q) {
    this._$q         = $q;
    this._cache      = cache;
    this._cacheKeys  = ['key.' + Math.random()];
    this._cacheTTL   = 30;
    this._loadDataCb = function () { return; }
    this._status     = new Z.Status();
}

Z.DataSource.prototype._generateCacheKey = function (params) {
    var parts = [],
        i, key;

    for (i = 0; i < this._cacheKeys.length; i++) {
        key = this._cacheKeys[i];

        if (key in params) {
            parts.push(key + ':' + angular.toJson(params[key]));
        } else {
            parts.push(key);
        }
    }

    return parts.join('.');
}

Z.DataSource.prototype._load = function (params) {
    var params = params || {};

    // Reset
    this._data = this._$q.defer();
    this._status.reset();
    
    // We're waiting to the dataPromise
    this._status.isLoading = true;
    this._status.update();

    // Check the cache
    var cacheKey  = this._generateCacheKey(params);
    var cacheData = this._cache.get(cacheKey);

    if (cacheData) {
        this._resolve(cacheData);
    } else {
        // Get the data promise
        var loadDataPromise = this._loadDataCb(params);
        var that = this;
      
        // Check if it's a promise, duck typing :-)
        if (!('catch' in loadDataPromise && 'finally' in loadDataPromise && 'then' in loadDataPromise)) {
            throw "DataBag::load needs a promise as the argument";
        }
    
        // When the promise is done
        loadDataPromise.then(function (data) {
            that._resolve(data);
            that._cache.set(cacheKey, data, that._cacheTTL);
        }, function (reason) {
            // Set the error status
            that._status.isError = true;
    
            // Try to get some old data
            var cacheData = that._cache.getOld(cacheKey);
    
            if (cacheData) {
                that._status.isOld = true;
                that._resolve(cacheData);
            } else {
                that._reject(reason);
            }
        });
    }
}

Z.DataSource.prototype._reject = function (reason) {
    this._data.reject(reason);

    // Notify parents
    this._status.update();
}

Z.DataSource.prototype._resolve = function (value) {
    this._status.isDone = true;
    this._status.isLoading = false;
    this._data.resolve(value);

    // Notify parents
    this._status.update();
};

Z.DataSource.prototype.get = function (params) {
    if (!this.isValid(params)) {
        this._load(params);
    }

    return {
        promise: this._data.promise,
        status:  this._status
    };
}

Z.DataSource.prototype.getStatus = function () {
    return this._status;
}

Z.DataSource.prototype.isValid = function (params) {
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
    if (!this._cache.get(this._generateCacheKey(params)) && !this._status.isLoading) {
        return false;
    }

    return true;
}

Z.DataSource.prototype.setCacheKeys = function (cacheKeys) {
    this._cacheKeys = cacheKeys;
}

Z.DataSource.prototype.setCacheTTL = function (cacheTTL) {
    this._cacheTTL = cacheTTL;
}

Z.DataSource.prototype.setLoadDataCb = function (loadDataCb) {
    this._loadDataCb = loadDataCb;
}
