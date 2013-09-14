'use strict';

Z.app.controller('WizardController', ['settingsManager', 'navigation', function(settingsManager, navigation) {
    this.activeView = 1;
    this.settings   = settingsManager.settings;

    this.popView = function () {
        this.activeView--;
    };

    this.pushView = function () {
        this.activeView++;
    };

    this.isActive = function() {
        if (this.activeView > 2) {
            this.activeView = 1;
        }

        return !settingsManager.settings.isCached();
    };

    this.updateSetting = function(id, option) {
        settingsManager.updateSetting(id, option);
        this.pushView();

        if (this.activeView === 3) {
            navigation.toHomepage();
        }
    };
}]);
