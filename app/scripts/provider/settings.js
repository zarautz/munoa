'use strict';

Z.Settings = function Settings() {

};

Z.app.provider('settings', function () {
    this.$get = function () {
        var settings = new Z.Settings();

        return settings;
    };
});
