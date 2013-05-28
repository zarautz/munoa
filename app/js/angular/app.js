'use strict';

var App = angular.module('zarautz', ['ngMobile']);
 
App.provider('menu', function() {
    this.$get = function() {
        return {
            isActive: false,
            items: [// TODO: read from outside, rearrange, etc.
                { path: '/settings', templateUrl: 'settings', label: 'Aukerak', icon: 'icon-cog' }, // This should be $first
                { path: '/',         templateUrl: 'index',    label: 'Zu Zarautz', icon: 'icon-home color-blue' },
                { path: '/events',   templateUrl: 'events',   label: 'Agenda', icon: 'icon-calendar color-orange' },
                { path: '/places',   templateUrl: 'places',   label: 'Zer ikusi', icon: 'icon-pictures color-red' },
                { path: '/weather',  templateUrl: 'weather',  label: 'Eguraldia', icon: 'icon-sun-alt color-yellow' },
                { path: '/sea',      templateUrl: 'sea',      label: 'Itsasoaren egoera', icon: 'icon-swim color-light-blue' },
                { path: '/health',   templateUrl: 'health',   label: 'Osasun zerbitzuak', icon: 'icon-medical color-green' }
            ]
        };
    };
});
