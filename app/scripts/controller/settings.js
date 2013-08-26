'use strict';

Z.app.controller('SettingsController', ['cache', 'settingsManager', function(cache, settingsManager) {
    this.updateSetting = function(id, option) {
        settingsManager.updateSetting(id, option);
    };

    this.clearCache = function () {
        cache.clear();
    }

    this.settings = settingsManager.settings;
}]);
