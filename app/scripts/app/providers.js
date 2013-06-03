'use strict';

Z.app.provider('menu', function () {
    this._items   = [];
    this._profile = 'zarautz';

    this.$get = function () {
        var menu = new Z.Menu();

        menu.setItems(this._items);
        menu.setProfile(this._profile);

        return menu;
    };

    this.setMenuItems = function (items) {
        this._items = items;
    };

    this.setProfile = function (profile) {
        this._profile = profile;
    };
});

Z.app.provider('babel', function () {
    this._catalogue = {};
    this._locale    = '';

    this.$get = function () {
        var babel = new Z.Babel();

        babel.setCatalogue(this._catalogue);
        babel.setLocale(this._locale);

        return babel;
    };

    this.setCatalogue = function (catalogue) {
        this._catalogue = catalogue;
    };

    this.setLocale = function (locale) {
        this._locale = locale;
    };
});

Z.app.provider('settings', function () {
    this.$get = function () {
        var settings = new Z.Settings();

        return settings;
    };
});
