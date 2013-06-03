Z.app.controller('SettingController', ['menu', function(menu) {
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

        setting.selectedKey = key;
    };
}]);
