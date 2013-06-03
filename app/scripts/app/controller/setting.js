Z.app.controller('SettingController', ['menu', 'babel', function(menu, babel) {
    this.settings = {
        locale: {
            id: 'locale',
            title: 'Language',
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
            title: 'Profile',
            selectedKey: 'tourist',
            options: {
                tourist: 'Tourist',
                zarautz: 'Zarauztarra'
            }
        }
    };

    this.updateSetting = function(setting, key) {
        if (setting.id == 'profile') {
            menu.setProfile(key);
        }

        if (setting.id == 'locale') {
            babel.setLocale(key);
        }

        setting.selectedKey = key;
    };
}]);
