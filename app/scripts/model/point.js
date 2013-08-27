'use strict';

Z.Model.Point = function (longitude, latitude) {
    this.longitude = longitude;
    this.latitude  = latitude;
}

Z.Model.Point.prototype.distanceTo = function (point) {
    // From: http://www.geodatasource.com/developers/javascript
    var lat1 = this.latitude;
    var lon1 = this.longitude;
    var lat2 = point.latitude;
    var lon2 = point.longitude;

    var radlat1  = Math.PI * lat1 / 180;
    var radlat2  = Math.PI * lat2 / 180;
    var radlon1  = Math.PI * lon1 / 180;
    var radlon2  = Math.PI * lon2 / 180;
    var theta    = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist     = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; // To KM

    return dist;
}

Z.Model.Point.prototype.getKey = function (precision) {
    // Default leave 4 decimals =~ 11m
    var precision = Math.pow(10, precision || 4);

    return new Z.Model.Point(
        Math.round(this.longitude * precision) / precision,
        Math.round(this.latitude * precision) / precision
    );
}
