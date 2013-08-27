'use strict';

Z.DataMapper = function DataMapper($q) {
    this._$q       = $q;
    this._mapperCb = function (values) { return values; };
    this._sources  = [];
    this._status   = new Z.Status();
};

Z.DataMapper.prototype._load = function (params) {
    var sourcePromises = [],
        that = this,
        i;

    // Reset
    this._data = this._$q.defer();
    this._status.reset();

    // Get source promises list
    for (i = 0; i < this._sources.length; i++) {
        sourcePromises.push(this._sources[i].get(params).promise);
    }

    // When all the sources are loaded map the data
    this._$q.all(sourcePromises).then(function (values) {
        var data = that._mapperCb(values);
        that._data.resolve(data);
        that._status.update();
    }, function (reason) {
        that._data.reject(reason);
        that._status.update();
    });

    this._status.update();
};

Z.DataMapper.prototype.get = function (params) {
    params = params || {};

    if (!this.isValid(params)) {
        this._load(params);
    }

    return {
        promise: this._data.promise,
        status:  this._status
    };
};

Z.DataMapper.prototype.isValid = function (params) {
    // Update status before checking
    this._status.update();

    // Check sources validity
    for (var i = 0; i < this._sources.length; i++) {
        if (!this._sources[i].isValid(params)) {
            return false;
        }
    }

    // There has been an error
    // It's old data
    // It's not done and is not loading
    // Data is not initialized
    if (this._status.isError ||
        this._status.isOld ||
        (!this._status.isDone && !this._status.isLoading) ||
        this._data === undefined
    ) {
        return false;
    }

    return true;
};

Z.DataMapper.prototype.setMapperCb = function (mapperCb) {
    this._mapperCb = mapperCb;
};

Z.DataMapper.prototype.setSources = function (sources) {
    for (var i = 0; i < sources.length; i++) {
        sources[i].getStatus().setParent(this._status);
    }

    this._sources = sources;
};
