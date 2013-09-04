'use strict';

Z.Model.Place = function (place) {
    angular.extend(this, place);
};

Z.Model.Place.prototype.distanceTo = function (point) {
    return this.location.distanceTo(point);
};

Z.Model.Place.prototype.getThumbnailImage = function () {
    var images = this.images,
        image = this.image;

    if (this.image !== undefined && this.image !== null) {
        return this.image.source.square;
    } else if (this.images !== undefined && this.images.length > 0) {
        return this.images[0].source.square;
    }

    return 'images/dot.png';
};
