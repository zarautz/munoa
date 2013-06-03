Z.Menu = function Menu() {
    this._items    = [];
    this._isActive = false;
    this._profile  = '';

    this.getItems = function () {
        return this._items;
    }

    this.getProfile = function () {
        return this._profile;
    }

    this.isActive = function () {
        return this._isActive;
    }

    this._reorderItems = function () {
        var profile = this.getProfile();

        this._items.sort(function (a, b) {
            return a.sort[profile] - b.sort[profile];
        });

        return this;
    }

    this.setIsActive = function (status) {
        this._isActive = status;

        return this;
    }

    this.setItems = function (items) {
        this._items = items;

        return this;
    }

    this.setProfile = function (profile) {
        this._profile = profile;
        this._reorderItems();

        return this;
    }

    this.toggleIsActive = function () {
        this._isActive = !this._isActive;

        return this;
    }
}
