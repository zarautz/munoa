'use strict';

Z.app.config(['$routeProvider', '$locationProvider', 'babelProvider', 'menuProvider', 'settingsProvider', function ($routeProvider, $locationProvider, babelProvider, menuProvider, settingsProvider) {
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
            icon: 'icon-temperature color-violet'
        },
        {
            id: 'poi',
            icon: 'icon-pictures color-red'
        },
        {
            id: 'sea',
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
    menuProvider.setProfile('zarautz');

    // Set the menu items order for each profile
    menuProvider.sortMenuItems('zarautz', [
        'settings',
        'zuzarautz',
        'events',
        'weather',
        'sea',
        'poi',
        'places',
    ]);

    menuProvider.sortMenuItems('tourist', [
        'settings',
        'poi',
        'events',
        'weather',
        'places',
        'sea',
        'zuzarautz'
    ]);

    // --------
    // SETTINGS
    // --------
    // This is no the Settings instance, it's the configuration of the provider
    settingsProvider.setSettings({
        language: {
            selected: 'eu',
            options: ['es', 'en', 'eu', 'fr']
        },
        profile: {
            selected: 'tourist',
            options: ['tourist', 'zarautz']
        }
    });

    // ------
    // ROUTES
    // ------
    // We get the menu items from the menu provider as these have been processed
    angular.forEach(menuProvider.getMenuItems(), function (item) {
        $routeProvider.when(item.path, {templateUrl: item.templateUrl});
    });

    //$routeProvider.otherwise({redirectTo: '/zuzarautz'});
    $locationProvider.html5Mode(true);
}]);
