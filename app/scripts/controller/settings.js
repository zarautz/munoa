'use strict';

Z.app.controller('SettingsController', ['cache', 'settingsManager', 'navigation', 'apiHost', function(cache, settingsManager, navigation, apiHost) {
    this.updateSetting = function(id, option) {
        settingsManager.updateSetting(id, option);
    };

    this.clearCache = function () {
        cache.clear();
        navigation.activeView = 1;
    };

    this.settings = settingsManager.settings;
    this.apiDocs  = apiHost.split('/', 3).join('/') +'/api/doc/';
}]);
