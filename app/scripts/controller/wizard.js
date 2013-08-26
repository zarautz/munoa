'use strict';

Z.app.controller('WizardController', ['$scope', 'settings', function($scope, settings) {
    this.isActive = function() {
       return !settings.isCached()
   };
}]);
