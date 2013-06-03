Z.app.provider('menu', function () {
    this._items   = [];
    this._profile = 'zarautz';

    this.$get = function () {
        var menu = new Z.Menu();

        menu.setItems(this._items);
        menu.setProfile(this._profile);

        return menu;
    }

    this.setMenuItems = function (items) {
        this._items = items;
    }

    this.setProfile = function (profile) {
        this._profile = profile;
    }
});