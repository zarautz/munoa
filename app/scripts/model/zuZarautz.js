'use strict';

Z.Model.ZuZarautz = function () {}

Z.Model.ZuZarautz.prototype.getThumbnailImage = function () {
    var images = this.contentImages,
        keys   = Object.keys(images);

    if (keys.length > 0) {
        return images[keys[0]].source.square;
    } else {
        return false;
    }
}
