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
            id: 'zuzarautz',
            path: '/',
            icon: 'icon-home color-blue'
        },
        {
            id: 'settings',
            icon: 'icon-cog'
        },
        {
            id: 'events',
            icon: 'icon-calendar color-orange'
        },
        {
            id: 'places',
            icon: 'icon-pictures color-red'
        },
        {
            id: 'weather',
            icon: 'icon-sun-alt color-yellow'
        },
        {
            id: 'sea',
            icon: 'icon-swim color-light-blue'
        },
        {
            id: 'health',
            icon: 'icon-medical color-green'
        }
    ];

    // This is not the Menu instance, it's the configuration of the provider
    menuProvider.setMenuItems(menuItems);
    menuProvider.setProfile('zarautz');

    // Set the menu items order for each profile
    menuProvider.sortMenuItems('zarautz', ['settings', 'zuzarautz', 'events', 'weather', 'sea', 'health', 'places']);
    menuProvider.sortMenuItems('tourist', ['settings', 'places', 'events', 'weather', 'sea', 'health', 'zuzarautz']);

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
    // We get the menu items from the provider as this have been processed
    angular.forEach(menuProvider.getMenuItems(), function (item) {
        $routeProvider.when(item.path, {templateUrl: item.templateUrl});
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);
