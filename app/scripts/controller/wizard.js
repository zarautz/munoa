'use strict';

Z.app.controller('WizardController', ['$scope', 'babel', 'menu', 'settings', function($scope, babel, menu, settings) {
    this.page     = 0;
    this.settings = settings;

    this.back = function () {
        this.page--;
    }

    this.isActive = function() {
        if (this.page > 1) {
            this.page = 0;
        }

        return !settings.isCached();
    };

    this.updateSetting = function(id, option) {
        if (id === 'profile') {
            menu.setProfile(option);
        }

        if (id === 'language') {
            babel.setLanguage(option);
        }

        settings.set(id, option);
        this.page++;
    };
}]);
