'use strict';

//var App = angular.module('zarautz', ['ngMobile']);
var App = angular.module('zarautz', []);
 
App.provider('menu', function() {
    this.$get = function() {
        return {
            isActive: false,
            items: [// TODO: read from outside, rearrange, etc.
                { path: '/settings', templateUrl: 'settings', id: 'settings', label: 'Aukerak', icon: 'icon-cog' }, // This should be $first
                { path: '/',         templateUrl: 'index',    id: 'index',    label: 'Zu Zarautz', icon: 'icon-home color-blue' },
                { path: '/events',   templateUrl: 'events',   id: 'events',   label: 'Agenda', icon: 'icon-calendar color-orange' },
                { path: '/places',   templateUrl: 'places',   id: 'places',   label: 'Zer ikusi', icon: 'icon-pictures color-red' },
                { path: '/weather',  templateUrl: 'weather',  id: 'weather',  label: 'Eguraldia', icon: 'icon-sun-alt color-yellow' },
                { path: '/sea',      templateUrl: 'sea',      id: 'sea',      label: 'Itsasoaren egoera', icon: 'icon-swim color-light-blue' },
                { path: '/health',   templateUrl: 'health',   id: 'health',   label: 'Osasun zerbitzuak', icon: 'icon-medical color-green' }
            ]
        };
    };
});
