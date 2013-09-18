'use strict';

Z.Model.Tide = function (tide) {
    angular.extend(this, tide);
};

Z.Model.Tide.prototype.getTides = function () {
    var tides = [],
        all   = this.high.concat(this.low),
        value, i;

    all.sort();

    for (i = 0; i < all.length; i++) {
        if (this.high.indexOf(all[i]) !== -1) {
            value = 'high';
        } else {
            value = 'low';
        }

        tides.push({ tide: value, hour: all[i] });
    }

    return tides;
};
