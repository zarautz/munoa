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

Z.PlacesConfig.Section.prototype.getGroups = function (profile) {
    var groups = [],
        that   = this,
        group;

    for (group in this.groups) {
        groups.push(group);
    }

    groups.sort(function (a, b) {
        return that.groups[a].sort[profile] - that.groups[b].sort[profile];
    });

    return groups;
};

Z.PlacesConfig.Section.prototype.sortGroups = function(profile, sorting) {
    var i;

    for (i = 0; i < sorting.length; i++) {
        this.groups[sorting[i]].sort[profile] = i;
    }

    return this;
};

//
// GROUP
//
Z.PlacesConfig.Group = function () {
    this.types           = [];
    this.sort            = {};
    this.showPriceFilter = false;
};

Z.PlacesConfig.Group.prototype.getTypes = function () {
    return this.types;
};

Z.PlacesConfig.Group.prototype.setTypes = function (types) {
    types.sort();
    this.types = types;
};

Z.PlacesConfig.Group.prototype.setShowPriceFilter = function (show) {
    this.showPriceFilter = show;
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

    section.sortGroups('tourist', ['pharmacy', 'misc']);
    section.sortGroups('zarautz', ['pharmacy', 'misc']);

    //
    // Places
    //
    section = config.addSection('places');

    group = section.addGroup('wifi');
    group.setTypes(['wifi']);

    group = section.addGroup('atm');
    group.setTypes(['atm']);

    group = section.addGroup('stores');
    group.setTypes(['hardware_store', 'bakery', 'butcher_shop', 'fish_shop', 'food', 'fruit_shop', 'grocery_or_supermarket', 'ice_cream_parlor']);
    group.setShowPriceFilter(true);

    group = section.addGroup('parking');
    group.setTypes(['parking']);

    group = section.addGroup('sports');
    group.setTypes(['sports']);

    group = section.addGroup('transport');
    group.setTypes(['transport']);

    group = section.addGroup('recycling');
    group.setTypes(['recycling']);

    group = section.addGroup('gastronomy');
    group.setTypes(['bar', 'cafe', 'meal_takeaway', 'night_club', 'restaurant', 'wine_store']);
    group.setShowPriceFilter(true);

    group = section.addGroup('lodging');
    group.setTypes(['lodging']);
    group.setShowPriceFilter(true);

    section.sortGroups('tourist', ['gastronomy', 'lodging', 'wifi', 'atm', 'stores', 'parking', 'sports', 'transport', 'recycling']);
    section.sortGroups('zarautz', ['wifi', 'atm', 'stores', 'parking', 'sports', 'transport', 'recycling', 'gastronomy', 'lodging']);

    //
    // POI
    //
    section = config.addSection('poi');

    group = section.addGroup('atm');
    group.setTypes(['atm']);

    section.sortGroups('tourist', ['atm']);
    section.sortGroups('zarautz', ['atm']);

    //
    // RETURN CONFIG INSTANCE
    //
    return config;
}]);
