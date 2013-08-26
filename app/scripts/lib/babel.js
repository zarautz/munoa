'use strict';

Z.Babel = function Babel() {
    this._language  = 'eu';
    this._catalogue = {};
};

Z.Babel.prototype.setCatalogue = function (catalogue) {
    this._catalogue = catalogue;

    return this;
};

Z.Babel.prototype.setLanguage = function (language) {
    this._language = language;

    return this;
};

Z.Babel.prototype.translate = function (key) {
    if (key in this._catalogue && this._language in this._catalogue[key]) {
        return this._catalogue[key][this._language];
    } else {
        return key;
    }
};
