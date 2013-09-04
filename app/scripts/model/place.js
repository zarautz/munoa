'use strict';

Z.Model.Place = function (place) {
    angular.extend(this, place);
};

Z.Model.Place.prototype.distanceTo = function (point) {
    return this.location.distanceTo(point);
};

Z.Model.Place.prototype.getThumbnailImage = function () {
    var images = this.images;

    return 'images/dot.png';
};
