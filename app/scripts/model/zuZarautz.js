'use strict';

Z.Model.ZuZarautz = function () {};

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
};

Z.Model.ZuZarautz.prototype.getThumbnailImage = function () {
    var files  = this.files,
        images = this.contentImages,
        keys   = Object.keys(images);

    // If an image is featured in ZuZarautz, goes to "files"
    // Use it by default
    if (files.length > 0 && files[0].type === 'image/jpg') {
        return files[0].image.source.square;
    } else if (keys.length > 0) { // TODO: check if user is connected
        return images[keys[0]].source.square;
    } else {
        return 'images/dot.png';
    }
};
