'use strict';

//Z.app.config(['$routeProvider', 'babelProvider', 'menuProvider', 'settingProvider', function ($routeProvider, babelProvider, menuProvider, settingProvider) {
Z.app.config(['$routeProvider', 'babelProvider', 'menuProvider', function ($routeProvider, babelProvider, menuProvider) {
    // Set BabelProvider init vars
    // This is no the Babel instance, it's the factory class
    babelProvider.setCatalogue(Z.catalogue);
    babelProvider.setLocale('eu'); // TODO: HAU ALDATU MOBILEKO DEFEKTUZKORA EDO LOCAL STORAGETIK HARTU

    var menuItems = [
        {
            id: 'index',
            path: '/',
            icon: 'icon-home color-blue',
            sort: {'zarautz': 1, 'tourist': 6}
        },
        {
            id: 'settings',
            icon: 'icon-cog',
            sort: {'zarautz': 0, 'tourist': 0}
        },
        {
            id: 'events',
            icon: 'icon-calendar color-orange',
            sort: {'zarautz': 2, 'tourist': 2}
        },
        {
            id: 'places',
            icon: 'icon-pictures color-red',
            sort: {'zarautz': 3, 'tourist': 1}
        },
        {
            id: 'weather',
            icon: 'icon-sun-alt color-yellow',
            sort: {'zarautz': 4, 'tourist': 3}
        },
        {
            id: 'sea',
            icon: 'icon-swim color-light-blue',
            sort: {'zarautz': 5, 'tourist': 4}
        },
        {
            id: 'health',
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
