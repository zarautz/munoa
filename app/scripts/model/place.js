'use strict';

Z.Model.Place = function (place) {
    angular.extend(this, place);
};

Z.Model.Place.prototype.distanceTo = function (point) {
    return this.location.distanceTo(point);
};

Z.Model.Place.prototype.getCleanTelephone = function () {
    return this.telephone.replace(/\s/g, '');
};

Z.Model.Place.prototype.getImage = function (size) {
    if (this.image !== undefined && this.image !== null) {
        return this.image.source[size];
    } else if (this.images !== undefined && this.images.length > 0) {
        return this.images[0].source[size];
    }

    return 'images/dot.png';
};

Z.Model.Place.prototype.getThumbnailImage = function () {
    return this.getImage('square');
};

Z.Model.Place.prototype.getTypeNamesExcept = function (excludeTypes) {
    var types = [], i, name;

    for (i in this.types) {
        name = this.types[i].name;

        if (-1 === excludeTypes.indexOf(this.types[i].code)) {
            types.push(name);
        }
    }

    return types;
};

Z.Model.Place.prototype.isOfType = function (typeCode) {
    var types = [], i;

    for (i in this.types) {
        if (this.types[i].code === typeCode) {
            return true;
        }
    }

    return false;
};
