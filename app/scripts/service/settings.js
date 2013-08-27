'use strict';

Z.app.provider('settings', function () {
    this._settings = {};

    this.$get = ['cache', function (cache) {
        var settings = new Z.Settings(cache);

        settings.setSettings(this._settings);

        return settings;
    }];

    this.setSettings = function (settings) {
        this._settings = settings;
    };
});
