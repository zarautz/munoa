'use strict';

Z.Babel = function Babel() {
    this._locale    = 'eu';
    this._catalogue = {};
};

Z.Babel.prototype.setCatalogue = function (catalogue) {
    this._catalogue = catalogue;

    return this;
};

Z.Babel.prototype.setLocale = function (locale) {
    this._locale = locale;

    return this;
};

Z.Babel.prototype.translate = function (key) {
    if (key in this._catalogue && this._locale in this._catalogue[key]) {
        return this._catalogue[key][this._locale];
    } else {
        return key;
    }
};
