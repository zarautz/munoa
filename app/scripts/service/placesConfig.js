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

    group.setName(name);
    this.groups[name] = group;

    return group;
};

Z.PlacesConfig.Section.prototype.getGroup = function (name) {
    return this.groups[name];
};

Z.PlacesConfig.Section.prototype.getGroups = function (profile) {
    var groups = [],
        group;

    for (group in this.groups) {
        groups.push(this.groups[group]);
    }

    groups.sort(function (a, b) {
        return a.sort[profile] - b.sort[profile];
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
    this.name            = '';
    this.icon            = '';
    this.showPriceFilter = false;
};

Z.PlacesConfig.Group.prototype.setTypes = function (types) {
    types.sort();
    this.types = types;

    return this;
};

Z.PlacesConfig.Group.prototype.getTypes = function () {
    return this.types;
};

Z.PlacesConfig.Group.prototype.setName = function (name) {
    this.name = name;

    return this;
};

Z.PlacesConfig.Group.prototype.setIcon = function (icon) {
    this.icon = icon;

    return this;
};

Z.PlacesConfig.Group.prototype.setShowPriceFilter = function (show) {
    this.showPriceFilter = show;

    return this;
};

//
// SERVICE
//
Z.app.factory('placesConfig', [function() {
    var config = new Z.PlacesConfig.Config(),
        section, group;

    //
    // HEALTH
    //
    section = config.addSection('health');

    group = section.addGroup('pharmacy');
    group
        .setTypes(['pharmacy'])
        .setIcon('icon-hospital')
    ;

    group = section.addGroup('doctors');
    group
        .setTypes(['dentist','doctor','health','health_center','optician','physiotherapist','podologist','psychologist','urgent_care'])
        .setIcon('icon-medical-alt')
    ;

    section.sortGroups('tourist', ['pharmacy', 'doctors']);
    section.sortGroups('zarautz', ['pharmacy', 'doctors']);

    //
    // PLACES
    //
    section = config.addSection('places');

    group = section.addGroup('wifi');
    group
        .setTypes(['wifi'])
        .setIcon('icon-wifi')
    ;

    group = section.addGroup('atm');
    group
        .setTypes(['atm'])
        .setIcon('icon-credit-card')
    ;

    group = section.addGroup('food');
    group
        .setTypes(['bakery', 'butcher_shop', 'fish_shop', 'food', 'fruit_shop', 'grocery_or_supermarket', 'ice_cream_parlor'])
        .setIcon('icon-basket')
    ;

    group = section.addGroup('shopping');
    group
        .setTypes(['clothing_store'])
        .setIcon('icon-shop')
        .setShowPriceFilter(true)
    ;

    group = section.addGroup('parking');
    group
        .setTypes(['parking'])
        .setIcon('icon-parking')
    ;

    group = section.addGroup('sports', 'golf', 'gym', 'surf_school');
    group
        .setTypes(['sports'])
        .setIcon('icon-pitch')
    ;

    group = section.addGroup('transport', 'train_station');
    group
        .setTypes(['transport'])
        .setIcon('icon-bus')
    ;

    group = section.addGroup('recycling');
    group
        .setTypes(['recycling'])
        .setIcon('icon-leaf')
    ;

    group = section.addGroup('drinking');
    group
        .setTypes(['bar', 'cafe', 'night_club', 'wine_store'])
        .setIcon('icon-beer')
    ;

    group = section.addGroup('restaurant');
    group
        .setTypes(['meal_takeaway', 'restaurant'])
        .setIcon('icon-restaurant')
        .setShowPriceFilter(true)
    ;

    group = section.addGroup('lodging');
    group
        .setTypes(['lodging', 'campground'])
        .setIcon('icon-lodging')
        .setShowPriceFilter(true)
    ;

    group = section.addGroup('police');
    group
        .setTypes(['police'])
        .setIcon('icon-police')
    ;

    section.sortGroups('tourist', ['wifi', 'atm', 'food', 'restaurant', 'lodging', 'drinking', 'shopping', 'sports', 'parking', 'transport', 'police', 'recycling']);
    section.sortGroups('zarautz', ['wifi', 'atm', 'transport', 'restaurant', 'drinking', 'food', 'shopping', 'sports', 'parking', 'recycling', 'police', 'lodging']);

    //
    // POI
    //
    section = config.addSection('poi');

    group = section.addGroup('poi');
    group
        .setTypes(['point_of_interest'])
        .setIcon('icon-ok')
    ;

    group = section.addGroup('nature');
    group
        .setTypes(['natural_feature'])
        .setIcon('icon-tree-2')
    ;

    group = section.addGroup('museum');
    group
        .setTypes(['museum', 'library'])
        .setIcon('icon-town-hall')
    ;

    group = section.addGroup('theater');
    group
        .setTypes(['theater'])
        .setIcon('icon-theatre')
    ;

    group = section.addGroup('sculpture');
    group
        .setTypes(['sculpture'])
        .setIcon('icon-layers')
    ;

    section.sortGroups('tourist', ['nature', 'museum', 'sculpture', 'theater']);
    section.sortGroups('zarautz', ['nature', 'museum', 'sculpture', 'theater']);

    //
    // RETURN CONFIG INSTANCE
    //
    return config;
}]);
