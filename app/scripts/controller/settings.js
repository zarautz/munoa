'use strict';

Z.app.controller('SettingsController', ['menu', 'babel', function(menu, babel) {
    this.settings = {
        locale: {
            id: 'locale',
            title: 'language',
            selectedKey: 'eu',
            options: {
                eu: 'Euskara',
                es: 'Castellano',
                en: 'English',
                fr: 'Française'
            }
        },
        profile: {
            id: 'profile',
            title: 'profile',
            selectedKey: 'tourist',
            options: {
                tourist: 'Tourist',
                zarautz: 'Zarauztarra'
            }
        }
    };

    this.updateSetting = function(setting, key) {
        if (setting.id === 'profile') {
            menu.setProfile(key);
        }

        if (setting.id === 'locale') {
            babel.setLocale(key);
        }

        setting.selectedKey = key;
    };
}]);
