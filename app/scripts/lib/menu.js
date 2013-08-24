'use strict';

Z.Menu = function Menu() {
    this._items    = [];
    this._isActive = false;
    this._profile  = '';
};

Z.Menu.prototype.getItems = function () {
    return this._items;
};

Z.Menu.prototype.getProfile = function () {
    return this._profile;
};

Z.Menu.prototype.isActive = function () {
    return this._isActive;
};

Z.Menu.prototype._reorderItems = function () {
    var profile = this.getProfile();

    this._items.sort(function (a, b) {
        return a.sort[profile] - b.sort[profile];
    });

    return this;
};

Z.Menu.prototype.setIsActive = function (status) {
    this._isActive = status;

    return this;
};

Z.Menu.prototype.setItems = function (items) {
    this._items = items;

    return this;
};

Z.Menu.prototype.setProfile = function (profile) {
    this._profile = profile;
    this._reorderItems();

    return this;
};

Z.Menu.prototype.toggleIsActive = function () {
    this._isActive = !this._isActive;

    return this;
};
