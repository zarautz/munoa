'use strict';

describe('Controller: NavigationController', function () {

    // load the controller's module
    beforeEach(module('zarautz'));

    var navCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        navCtrl = $controller('NavigationController', {
            $scope: scope
        });
    }));

    it('should start in view 1', function () {
        expect(navCtrl.activeView).toBe(1);
    });
});
