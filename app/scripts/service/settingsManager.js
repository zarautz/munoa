'use strict';

Z.app.factory('settingsManager', ['babel', 'menu', 'settings', function(babel, menu, settings) {
    return {
        updateSetting: function (id, option) {
            if (id === 'profile') {
                menu.setProfile(option);
            }

            if (id === 'language') {
                babel.setLanguage(option);
            }

            settings.set(id, option);
        },
        settings: settings
    };
}]);
