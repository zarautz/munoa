'use strict';

describe('Controller: NavigationController', function () {

    // load the controller's module
    beforeEach(module('munoa'));

    var navCtrl, scope,
        initialActiveView,
        initialMenuProfile,
        initialMenuIsActive;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        navCtrl = $controller('NavigationController', {
            $scope: scope
        });
        initialActiveView = navCtrl.activeView;
    }));

    it('should start in activeView 1', function () {
        expect(navCtrl.activeView).toBe(1);
    });

    describe("getClassForPath()", function() {
        it('is tested', function () {
            expect(false).toBe(true);
        });
    });

    describe("openSection()", function() {
        it('should hide menu', function () {
            navCtrl.openSection();
            expect(navCtrl.menu.isActive()).toBe(false);
        });

        it('tests $location', function () {
            expect(false).toBe(true);
        });
    });

    describe("popView()", function() {
        it('should -1 activeView', function () {
            navCtrl.popView();
            expect(navCtrl.activeView).toBe(initialActiveView - 1);
        });
    });

    describe("pushView()", function() {
        it('should +1 activeView', function () {
            navCtrl.pushView();
            expect(navCtrl.activeView).toBe(initialActiveView + 1);
        });

        describe("--when menu is active--", function() {
            beforeEach(function() {
                navCtrl.toggleMenu();
                navCtrl.pushView();
            });

            it('should not change activeView', function () {
                expect(navCtrl.activeView).toBe(initialActiveView);
            });

            it('should close menu', function () {
                expect(navCtrl.menu.isActive()).toBe(false);
            });
        });
    });

    describe("toggleMenu()", function() {
        beforeEach(function() {
            initialMenuIsActive = navCtrl.menu.isActive();
        });

        it('should change menu status', function () {
            navCtrl.toggleMenu();
            expect(navCtrl.menu.isActive()).toBe(!initialMenuIsActive);
            navCtrl.toggleMenu();
            expect(navCtrl.menu.isActive()).toBe(initialMenuIsActive);
        });
    });
});
