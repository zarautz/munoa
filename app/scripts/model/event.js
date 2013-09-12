'use strict';

Z.Model.Event = function (event) {
    angular.extend(this, event);
};

Z.Model.Event.prototype.getImage = function (size) {
    if (this.image !== undefined && this.image !== null) {
        return this.image.source[size];
    }

    return 'images/dot.png';
};

Z.Model.Event.prototype.getThumbnailImage = function () {
    return this.getImage('square');
};
