'use strict';

Z.Model.Event = function (event) {
    angular.extend(this, event);
};

Z.Model.Event.prototype.timeIsSet = function (field) {
    var hour = moment(this[field]).format('HH:mm');

    return (hour !== '00:00');
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

Z.Model.Event.prototype.getCategoryNames = function () {
    var names = [], sname,
        day, i;

    if (this.category.name !== undefined) {
        names.push(this.category.name);
    }

    for (day = 0; day < this.subEvents.length; day++) {
        for (i = 0; i < this.subEvents[day].events.length; i++) {
            sname = this.subEvents[day].events[i].category.name;

            if (sname !== undefined && names.indexOf(sname) === -1) {
                names.push(sname);
            }
        }
    }

    return names.sort();
};

Z.Model.Event.prototype.countSubEvents = function () {
    var count = 0,
        day, i;

    for (day = 0; day < this.subEvents.length; day++) {
        for (i = 0; i < this.subEvents[day].events.length; i++) {
            count++;
        }
    }

    return count;
};
