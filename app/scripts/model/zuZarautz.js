'use strict';

Z.Model.ZuZarautz = function () {}

Z.Model.ZuZarautz.prototype.getContent = function (size) {
    if (size !== undefined) {
        var content = this.content,
            path;

        for (path in this.contentImages) {
            if (this.contentImages[path].source[size]) {
                content = content.replace(path, this.contentImages[path].source[size]);
            }
        }

        return content;
    } else {
        return this.content;
    }
}

Z.Model.ZuZarautz.prototype.getThumbnailImage = function () {
    var images = this.contentImages,
        keys   = Object.keys(images);

    if (keys.length > 0) { // TODO: check if user is connected
        return images[keys[0]].source.square;
    } else {
        return 'images/dot.png';
    }
}
