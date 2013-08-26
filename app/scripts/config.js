'use strict';

Z.app.config(['$routeProvider', 'babelProvider', 'menuProvider', 'settingsProvider', function ($routeProvider, babelProvider, menuProvider, settingsProvider) {
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
            id: 'atm',
            icon: 'icon-medical color-green'
        },
        {
            id: 'events',
            icon: 'icon-calendar color-orange'
        },
        {
            id: 'gastronomy',
            icon: 'icon-medical color-green'
        },
        {
            id: 'health',
            icon: 'icon-medical color-green'
        },
        {
            id: 'lodging',
            icon: 'icon-medical color-green'
        },
        {
            id: 'parking',
            icon: 'icon-medical color-green'
        },
        {
            id: 'poi',
            icon: 'icon-pictures color-red'
        },
        {
            id: 'recycling',
            icon: 'icon-medical color-green'
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
            id: 'sports',
            icon: 'icon-medical color-green'
        },
        {
            id: 'stores',
            icon: 'icon-medical color-green'
        },
        {
            id: 'transport',
            icon: 'icon-medical color-green'
        },
        {
            id: 'weather',
            icon: 'icon-sun-alt color-yellow'
        },
        {
            id: 'wifi',
            icon: 'icon-medical color-green'
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
        'health',
        'poi',
        'wifi',
        'atm',
        'stores',
        'parking',
        'sports',
        'transport',
        'recycling',
        'gastronomy',
        'lodging'
    ]);

    menuProvider.sortMenuItems('tourist', [
        'settings',
        'poi',
        'events',
        'weather',
        'sea',
        'health',
        'zuzarautz',
        'wifi',
        'atm',
        'stores',
        'parking',
        'sports',
        'transport',
        'recycling',
        'gastronomy',
        'lodging'
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

    $routeProvider.otherwise({redirectTo: '/'});
}]);
