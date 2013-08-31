'use strict';

Z.app.controller('PlaceListController', ['$scope', 'placesMapper', 'placesConfig', 'settings', 'sort', 'filter', function($scope, placesMapper, placesConfig, settings, sort, filter) {
    this.clearFilters = function () {console.log(this.filter);
        this.filter.name  = null;
        this.filter.price = null;
        this.filter.type  = null;

        this.refreshList();
    }

    this.refresh = function () {
        this.section      = $scope.pushData.section;
        this.group        = $scope.pushData.group;
        this.types        = placesConfig.getSection(this.section).getGroup(this.group).getTypes();
        this.prices       = [0, 1, 2, 3, 4];
        this.sorting      = {'type': null, 'order': null}
        this.filter       = {'show': false};
        this.userLocation = new Z.Model.Point(-2.175637, 43.286450);
        this.list         = [];

        this.pager = new Z.Paginator();
        this.pager.setPageSize(10);

        var places = placesMapper.get({'language': settings.get('language'), 'types': this.types.join(',') });

        this.status = places.status;
        this.places = places.promise;

        this.clearFilters();
        this.setSorting('name');
    };

    this.setSorting = function (name, order) {
        order = order || 'ASC';
        order = order.toUpperCase();

        if (order !== 'ASC') {
            order = 'DESC';
        }

        this.sorting['type']  = name;
        this.sorting['order'] = order;

        this.refreshList();
    }

    this.setFilter = function (filter, value) {
        // If saved value == setFilter value then we switch off the filter
        if (this.filter[filter] === value) {
            this.filter[filter] = null;
        } else {
            // KeyUp fix
            if (filter == 'name' && value == undefined) {
                value = this.filter.name;
            }

            if (value !== null) {
                this.filter[filter] = value;
            } else {
                this.filter[filter] = null;
            }
        }
        
        this.refreshList();
    }

    this.toggleFilters = function () {
        this.filter.show = !this.filter.show;
    }

    this.refreshList = function () {
        var that = this;

        this.places.then(function (places) {
            var filterCfg = [], 
                sortCfg   = [];

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
            if (that.sorting.type === 'distance') {
                sortCfg.push({type: 'distance', order: that.sorting.order, params: [places, that.userLocation]});
            }

            sortCfg.push({type: 'property', order: that.sorting.order, params: ['name']});

            places = sort.sort(places, sortCfg);

            //
            // Update Pager
            //
            that.pager.setItems(places);
            that.pager.moveTo(1);
        });
    }

    this.refresh();
}]);
