'use strict';

Z.PlacesConfig = {};

//
// CONFIG
//
Z.PlacesConfig.Config = function () {};

Z.PlacesConfig.Config.prototype.addSection = function (name) {
    var section = new Z.PlacesConfig.Section();

    this[name] = section;

    return section;
};

Z.PlacesConfig.Config.prototype.getSection = function (name) {
    return this[name];
};

//
// SECTION
//
Z.PlacesConfig.Section = function () {
    this.groups = {};
};

Z.PlacesConfig.Section.prototype.addGroup = function (name) {
    var group = new Z.PlacesConfig.Group();

    this.groups[name] = group;

    return group;
};

Z.PlacesConfig.Section.prototype.getGroup = function (name) {
    return this.groups[name];
};

Z.PlacesConfig.Section.prototype.getGroups = function () {
    var groups = [],
        group;

    for (group in this.groups) {
        groups.push(group);
    }

    return groups;
};

//
// GROUP
//
Z.PlacesConfig.Group = function () {
    this.types = [];
};

Z.PlacesConfig.Group.prototype.setTypes = function (types) {
    types.sort();
    this.types = types;
};

Z.PlacesConfig.Group.prototype.getTypes = function () {
    return this.types;
};

//
// SERVICE
//
Z.app.factory('placesConfig', [function() {
    var config = new Z.PlacesConfig.Config(),
        section, group;

    //
    // Health
    //
    section = config.addSection('health');

    group = section.addGroup('pharmacy');
    group.setTypes(['pharmacy']);

    group = section.addGroup('misc');
    group.setTypes(['dentist','doctor','health','health_center','optician','physiotherapist','podologist','psychologist','urgent_care']);

    //
    // Places
    //
    section = config.addSection('places');

    group = section.addGroup('wifi');
    group.setTypes(['wifi']);

    group = section.addGroup('atm');
    group.setTypes(['atm']);

    group = section.addGroup('stores');
    group.setTypes(['hardware_store']);

    group = section.addGroup('parking');
    group.setTypes(['parking']);

    group = section.addGroup('sports');
    group.setTypes(['sports']);

    group = section.addGroup('transport');
    group.setTypes(['transport']);

    group = section.addGroup('recycling');
    group.setTypes(['recycling']);

    group = section.addGroup('gastronomy');
    group.setTypes(['gastronomy']);

    group = section.addGroup('lodging');
    group.setTypes(['lodging']);

    //
    // POI
    //
    section = config.addSection('poi');

    group = section.addGroup('atm');
    group.setTypes(['atm']);

    //
    // RETURN CONFIG INSTANCE
    //
    return config;
}]);
