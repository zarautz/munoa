'use strict';

//Z.app.config(['$routeProvider', 'babelProvider', 'menuProvider', 'settingProvider', function ($routeProvider, babelProvider, menuProvider, settingProvider) {
Z.app.config(['$routeProvider', 'babelProvider', 'menuProvider', function ($routeProvider, babelProvider, menuProvider) {
    // Set BabelProvider init vars
    // This is no the Babel instance, it's the factory class
    babelProvider.setCatalogue(Z.catalogue);
    babelProvider.setLocale('eu'); // HAU ALDATU MOBILEKO DEFEKTUZKORA EDO LOCAL STORAGETIK HARTU

    var menuItems = [
        {
            id: 'index',
            path: '/',
            templateUrl: 'views/index.html',
            label: 'Zu Zarautz',
            icon: 'icon-home color-blue',
            sort: {'zarautz': 1, 'tourist': 6}
        },
        {
            id: 'settings',
            path: '/settings',
            templateUrl: 'views/settings.html',
            label: 'Aukerak',
            icon: 'icon-cog',
            sort: {'zarautz': 0, 'tourist': 0}
        },
        {
            id: 'events',
            path: '/events',
            templateUrl: 'views/events.html',
            label: 'Agenda',
            icon: 'icon-calendar color-orange',
            sort: {'zarautz': 2, 'tourist': 2}
        },
        {
            id: 'places',
            path: '/places',
            templateUrl: 'views/places.html',
            label: 'Zer ikusi',
            icon: 'icon-pictures color-red',
            sort: {'zarautz': 3, 'tourist': 1}
        },
        {
            id: 'weather',
            path: '/weather',
            templateUrl: 'views/weather.html',
            label: 'Eguraldia',
            icon: 'icon-sun-alt color-yellow',
            sort: {'zarautz': 4, 'tourist': 3}
        },
        {
            id: 'sea',
            path: '/sea',
            templateUrl: 'views/sea.html',
            label: 'Itsasoaren egoera',
            icon: 'icon-swim color-light-blue',
            sort: {'zarautz': 5, 'tourist': 4}
        },
        {
            id: 'health',
            path: '/health',
            templateUrl: 'views/health.html',
            label: 'Osasun zerbitzuak',
            icon: 'icon-medical color-green',
            sort: {'zarautz': 6, 'tourist': 5}
        }
    ];

    // Set MenuProvider init vars
    // This is not the Menu instance, it's the factory class
    menuProvider.setMenuItems(menuItems);
    menuProvider.setProfile('zarautz');

    // Set SettingsProvider init vars
    // This is no the Settings instance, it's the factory class
    // settingsProvider.doSomething();

    // Routes
    angular.forEach(menuItems, function (item) {
        $routeProvider.when(item.path, {templateUrl: item.templateUrl});
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);
