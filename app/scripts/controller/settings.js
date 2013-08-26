'use strict';

Z.app.controller('SettingsController', ['babel', 'cache', 'menu', 'settings', function(babel, cache, menu, settings) {
    this.updateSetting = function(id, option) {
        if (id === 'profile') {
            menu.setProfile(option);
        }

        if (id === 'language') {
            babel.setLanguage(option);
        }

        settings.set(id, option);
    };

    this.clearCache = function () {
        cache.clear();
    }

    this.settings = settings;
}]);
