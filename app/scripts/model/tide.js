'use strict';

Z.Model.Tide = function (tide) {
    angular.extend(this, tide);
};

Z.Model.Tide.prototype.getTides = function () {
    var tides = [],
        all   = this.high.concat(this.low),
        tide, i;

    all.sort();

    for (i = 0; i < all.length; i++) {
        if (this.high.indexOf(all[i]) >= 0) {
            tide = 'high';
        } else {
            tide = 'low';
        }

        tides.push({tide: tide, hour: all[i]});
    }

    return tides;
}
