'use strict';

Z.Model.PlaceCollection = function (places) {
    this._places = places;
}

Z.Model.PlaceCollection.prototype.all = function () {
    return this._places;
}
