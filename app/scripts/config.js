'use strict';

Z.app.config(['$compileProvider', '$routeProvider', '$locationProvider', 'babelProvider', 'menuProvider', 'settingsProvider', function ($compileProvider, $routeProvider, $locationProvider, babelProvider, menuProvider, settingsProvider) {
    // ----
    // URLs
    // ----
    // Add "tel:" and "map:" links as safe providers
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(file|https?|mailto|tel):/);

    // -----
    // BABEL
    // -----
    // This is no the Babel instance, it's the configuration of the provider
    babelProvider.setCatalogue(Z.catalogue);

    // ----
    // MENU
    // ----
    var menuItems = [
        {
            id: 'events',
            icon: 'icon-calendar color-orange'
        },
        {
            id: 'places',
            route: '/places/:section',
            path: '/places/places',
            icon: 'icon-location-alt color-violet',
            templateUrl: 'views/places.html'
        },
        {
            id: 'poi',
            route: '/places/:section',
            path: '/places/poi',
            icon: 'icon-pictures color-red',
            templateUrl: 'views/places.html'
        },
        {
            id: 'health',
            route: '/places/:section',
            path: '/places/health',
            icon: 'icon-hospital-alt color-green',
            templateUrl: 'views/places.html'
        },
        {
            id: 'tides',
            icon: 'icon-swim color-light-blue'
        },
        {
            id: 'settings',
            icon: 'icon-cog'
        },
        {
            id: 'weather',
            icon: 'icon-sun-alt color-yellow'
        },
        {
            id: 'zuzarautz',
            path: '/',
            icon: 'icon-home color-blue'
        }
    ];

    // This is not the Menu instance, it's the configuration of the provider
    menuProvider.setMenuItems(menuItems);

    // Set the menu items order for each profile
    menuProvider.sortMenuItems('zarautz', [
        'settings',
        'zuzarautz',
        'events',
        'weather',
        'tides',
        'places',
        'health',
        'poi'
    ]);

    menuProvider.sortMenuItems('tourist', [
        'settings',
        'poi',
        'places',
        'events',
        'weather',
        'tides',
        'health',
        'zuzarautz'
    ]);

    // --------
    // SETTINGS
    // --------
    // This is no the Settings instance, it's the configuration of the provider
    settingsProvider.setSettings({
        language: {
            selected: 'eu',
            options: ['eu', 'es', 'en', 'fr']
        },
        profile: {
            selected: 'zarautz',
            options: ['zarautz', 'tourist']
        }
    });

    // ------
    // ROUTES
    // ------
    // We get the menu items from the menu provider as these have been processed
    angular.forEach(menuProvider.getMenuItems(), function (item) {
        $routeProvider.when(item.route, { templateUrl: item.templateUrl });
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);
