'use strict';

Z.Setting = function Setting() {

};

Z.app.provider('setting', function () {
    this.$get = function () {
        var setting = new Z.Setting();

        return setting;
    };
});
