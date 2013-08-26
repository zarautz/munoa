'use strict';

Z.app.provider('babel', function () {
    this._catalogue = {};

    this.$get = ['settings', function (settings) {
        var babel = new Z.Babel();

        babel.setCatalogue(this._catalogue);
        babel.setLanguage(settings.get('language'));

        return babel;
    }];

    this.setCatalogue = function (catalogue) {
        this._catalogue = catalogue;
    };
});
