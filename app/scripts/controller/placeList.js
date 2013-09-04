'use strict';

Z.app.controller('PlaceListController', ['$scope', 'placesMapper', 'placeTypesMapper', 'placesConfig', 'placeFavorite', 'settings', 'sort', 'filter', 'geolocation', function($scope, placesMapper, placeTypesMapper, placesConfig, placeFavorite, settings, sort, filter, geolocation) {
    this.clearFilters = function () {
        this.filter.show  = false;
        this.filter.name  = null;
        this.filter.price = null;
        this.filter.type  = null;

        this.refreshList();
    };

    this.initData = function () {
        var that = this,
            i;

        // PlaceTypes for filter types i18n
        var placeTypes  = placeTypesMapper.get({'language': settings.get('language')});
        this.placeTypes = placeTypes.promise;

        this.placeTypes.then(function (types) {
            // Save i18n names
            for (i = 0; i < that.types.length; i++) {
                that.typesI18N[that.types[i]] = types[that.types[i]].name;
            }

            // Sort types based on typesI18N
            that.types.sort(function (a, b) {
                a = that.typesI18N[a].toLowerCase();
                b = that.typesI18N[b].toLowerCase();

                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                } else {
                    return 0;
                }
            });
        });

        // Group place list
        var places  = placesMapper.get({'language': settings.get('language'), 'types': this.types.join(',') });
        this.places = places.promise;

        // Metastatus
        this.status = new Z.Status([placeTypes.status, places.status]);
    };

    this.initVars = function () {
        this.section      = $scope.pushData.section;
        this.group        = $scope.pushData.group;
        this.groupObj     = placesConfig.getSection(this.section).getGroup(this.group);
        this.types        = this.groupObj.getTypes();
        this.typesI18N    = {};
        this.prices       = [0, 1, 2, 3, 4];
        this.sorting      = {'type': null, 'order': null};
        this.filter       = {'show': false};
        this.list         = [];
        this.pager        = new Z.Paginator();
        this.userLocation = geolocation.getCurrentPosition();
        this.totalItems   = 0;
        this.favorite     = placeFavorite;

        this.pager.setPageSize(10);
    };

    this.isFiltered = function () {
        return this.filter.name !== null || this.filter.price !== null || this.filter.type !== null;
    };

    this.refresh = function () {
        this.initVars();
        this.initData();
        this.clearFilters();
        this.setSorting('name');
    };

    this.setSorting = function (name, order) {
        order = order || 'ASC';
        order = order.toUpperCase();

        if (order !== 'ASC') {
            order = 'DESC';
        }

        this.sorting.type  = name;
        this.sorting.order = order;

        this.refreshList();
    };

    this.setFilter = function (filter, value) {
        if (filter === 'name') {
            if (!value) {
                value = null;
            } else {
                value = this.filter.name;
            }
        }

        // If saved value == setFilter value then we switch off the filter
        if (this.filter[filter] === value && filter !== 'name') {
            this.filter[filter] = null;
        } else {
            if (value !== null) {
                this.filter[filter] = value;
            } else {
                this.filter[filter] = null;
            }
        }

        this.refreshList();
    };

    this.toggleFilters = function () {
        this.filter.show = !this.filter.show;
    };

    this.refreshList = function () {
        var that = this;

        this.places.then(function (places) {
            var filterCfg = [],
                sortCfg   = [];

            // Keep a REAL total
            that.totalItems = places.length;

            //
            // Filter
            //
            if (!!that.filter.name) {
                filterCfg.push({type: 'property', value: that.filter.name, params: ['name', 'contains']});
            }

            if (that.filter.price !== null) {
                filterCfg.push({type: 'property', value: that.filter.price, params: ['price', 'equals']});
            }

            if (that.filter.type !== null) {
                filterCfg.push({type: 'placeType', value: that.filter.type});
            }

            places = filter.filter(places, filterCfg);

            //
            // Sort
            //
            if (that.sorting.type === 'favorite') {
                sortCfg.push({type: 'favorite', order: that.sorting.order});
            }

            if (that.sorting.type === 'distance') {
                sortCfg.push({type: 'distance', order: that.sorting.order, params: [places, that.userLocation.location]});
            }

            sortCfg.push({type: 'property', order: that.sorting.order, params: ['name']});

            places = sort.sort(places, sortCfg);

            //
            // Update Pager
            //
            that.pager.setItems(places);
            that.pager.moveTo(1);
        });
    };

    this.refresh();
}]);
