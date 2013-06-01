'use strict';

var App = angular.module('zarautz', ['ngMobile']);

App.provider('menu', function() {
    this.$get = function() {
        return {
            isActive: false,
            items: [// TODO: read from outside, rearrange, etc.
                { path: '/settings', templateUrl: 'views/settings.html', id: 'settings', label: 'Aukerak', icon: 'icon-cog' },
                { path: '/',         templateUrl: 'views/index.html',    id: 'index',    label: 'Zu Zarautz', icon: 'icon-home color-blue' },
                { path: '/events',   templateUrl: 'views/events.html',   id: 'events',   label: 'Agenda', icon: 'icon-calendar color-orange' },
                { path: '/places',   templateUrl: 'views/places.html',   id: 'places',   label: 'Zer ikusi', icon: 'icon-pictures color-red' },
                { path: '/weather',  templateUrl: 'views/weather.html',  id: 'weather',  label: 'Eguraldia', icon: 'icon-sun-alt color-yellow' },
                { path: '/sea',      templateUrl: 'views/sea.html',      id: 'sea',      label: 'Itsasoaren egoera', icon: 'icon-swim color-light-blue' },
                { path: '/health',   templateUrl: 'views/health.html',   id: 'health',   label: 'Osasun zerbitzuak', icon: 'icon-medical color-green' }
            ]
        };
    };
});
