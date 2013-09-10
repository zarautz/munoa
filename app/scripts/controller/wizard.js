'use strict';

Z.app.controller('WizardController', ['settingsManager', '$scope', function(settingsManager, $scope) {
    this.page     = 0;
    this.settings = settingsManager.settings;

    this.back = function () {
        this.page--;
    };

    this.isActive = function() {
        if (this.page > 1) {
            this.page = 0;
        }

        return !settingsManager.settings.isCached();
    };

    this.updateSetting = function(id, option) {
        settingsManager.updateSetting(id, option);
        this.page++;

        if (this.page === 2) {
            $scope.navigation.popView();
            $scope.navigation.location.path('/');
        }
    };
}]);
