'use strict';

Z.Babel = function Babel() {
    this._locale    = 'eu';
    this._catalogue = {};

    this.setCatalogue = function (catalogue) {
        this._catalogue = catalogue;

        return this;
    };

    this.setLocale = function (locale) {
        this._locale = locale;

        return this;
    };

    this.translate = function (key) {
        if (key in this._catalogue && this._locale in this._catalogue[key]) {
            return this._catalogue[key][this._locale];
        } else {
            return key;
        }
    };
};

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
