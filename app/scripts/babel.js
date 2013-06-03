Z.Babel = function Babel() {
    this._locale    = 'eu';
    this._catalogue = {};

    this.setCatalogue = function (catalogue) {
        this._catalogue = catalogue;

        return this;
    }

    this.setLocale = function (locale) {
        this._locale = locale;

        return this;
    }

    this.translate = function (key) {
        if (key in this._catalogue && this._locale in this._catalogue[key]) {
            return this._catalogue[key][this._locale];
        } else {
            return key;
        }
    }
}
