'use strict';

Z.Model.Point = function (longitude, latitude) {
    this.longitude = longitude;
    this.latitude  = latitude;
};

Z.Model.Point.prototype._deg2rad = function (deg) {
    return deg * (Math.PI / 180);
};

Z.Model.Point.prototype.distanceTo = function (point) {
    // http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
    var lat1 = this.latitude;
    var lon1 = this.longitude;
    var lat2 = point.latitude;
    var lon2 = point.longitude;

    var R    = 6371; // Radius of the earth in km
    var dLat = this._deg2rad(lat2 - lat1);
    var dLon = this._deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    return d;
};

Z.Model.Point.prototype.getKey = function (precision) {
    // Default leave 4 decimals =~ 11m
    precision = Math.pow(10, precision || 4);

    return new Z.Model.Point(
        Math.round(this.longitude * precision) / precision,
        Math.round(this.latitude * precision) / precision
    );
};
