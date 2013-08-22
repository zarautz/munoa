'use strict';

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
