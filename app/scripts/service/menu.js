'use strict';

//
// Factory
//
Z.app.provider('menu', function () {
    this._items   = [];
    this._profile = 'zarautz';
    this._map     = {};

    this.$get = function () {
        var menu = new Z.Menu();

        menu.setItems(this._items);
        menu.setProfile(this._profile);

        return menu;
    };

    this.getMenuItems = function () {
        return this._items;
    };

    this.setMenuItems = function (items) {
        var item;

        for (item in items) {
            item = items[item];

            if (!('path' in item)) {
                item.path = '/'+ item.id;
            }

            if (!('route' in item)) {
                item.route = item.path;
            }

            if (!('templateUrl' in item)) {
                item.templateUrl = 'views/'+ item.id +'.html';
            }

            item.sort = {};

            this._map[item.id] = item;
        }

        this._items = items;
    };

    this.setProfile = function (profile) {
        this._profile = profile;
    };

    this.sortMenuItems = function (profile, sort) {
        var i, item;

        for (i = 0; i < sort.length; i++) {
            item = this._map[sort[i]];
            item.sort[profile] = i;
        }
    };
});
