'use strict';

Z.app.controller('WizardController', ['$scope', 'settings', function($scope, settings) {
    this.show = !settings.isCached();
}]);
