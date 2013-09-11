'use strict';

Z.Settings = function Settings(cache) {
    this._cache    = cache;
    this._settings = {};
};

Z.Settings.prototype._checkId = function (id) {
    if (!(id in this._settings)) {
        throw 'Settings id: "' + id + '" not found.';
    }
};

Z.Settings.prototype._generateCacheKey = function (id) {
    return '[settings].' + id;
};

Z.Settings.prototype.get = function (id) {
    this._checkId(id);
    return this._settings[id].selected;
};

Z.Settings.prototype.getIds = function () {
    var ids = [];

    angular.forEach(this._settings, function(value, id) {
        ids.push(id);
    });

    return ids;
};

Z.Settings.prototype.getOptions = function (id) {
    this._checkId(id);
    return this._settings[id].options;
};

Z.Settings.prototype.isCached = function () {
    var ids = this.getIds(),
        cacheData, cacheKey, i;

    for (i = 0; i < ids.length; i++) {
        cacheKey  = this._generateCacheKey(ids[i]);
        cacheData = this._cache.get(cacheKey);

        if (!cacheData) {
            return false;
        }
    }

    return true;
};

Z.Settings.prototype.loadFromCache = function () {
    var ids = this.getIds(),
        cacheData, cacheKey, i;

    for (i = 0; i < ids.length; i++) {
        cacheKey  = this._generateCacheKey(ids[i]);
        cacheData = this._cache.get(cacheKey);

        if (cacheData) {
            this.set(ids[i], cacheData);
        }
    }
};

Z.Settings.prototype.set = function (id, option) {
    var found = false,
        i;

    this._checkId(id);

    // Check if the option exists
    for (i = 0; this._settings[id].options.length; i++) {
        if (this._settings[id].options[i] === option) {
            found = true;
            break;
        }
    }

    // Abort if option is not found
    if (!found) {
        throw 'Invalid option: "' + option + '" for setting id: "' + id + '".';
    }

    // Save in cache
    if (this._cache) {
        this._cache.set(this._generateCacheKey(id), option);
    }

    // Save local value
    this._settings[id].selected = option;
};

Z.Settings.prototype.setSettings = function (settings) {
    this._settings = settings;

    if (this._cache) {
        this.loadFromCache();
    }
};
