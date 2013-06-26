'use strict';

Z.Menu = function Menu() {
    this._items    = [];
    this._isActive = false;
    this._profile  = '';

    this.getItems = function () {
        return this._items;
    };

    this.getProfile = function () {
        return this._profile;
    };

    this.isActive = function () {
        return this._isActive;
    };

    this._reorderItems = function () {
        var profile = this.getProfile();

        this._items.sort(function (a, b) {
            return a.sort[profile] - b.sort[profile];
        });

        return this;
    };

    this.setIsActive = function (status) {
        this._isActive = status;

        return this;
    };

    this.setItems = function (items) {
        this._items = items;

        return this;
    };

    this.setProfile = function (profile) {
        this._profile = profile;
        this._reorderItems();

        return this;
    };

    this.toggleIsActive = function () {
        this._isActive = !this._isActive;

        return this;
    };
};

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
