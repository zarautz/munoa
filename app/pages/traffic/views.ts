import {Type} from 'angular2/core';
import {Page} from 'ionic-angular';


@Page({
    templateUrl: 'build/pages/traffic/templates/traffic-tabs.html'
})
export class TrafficTabs {
    incidents: Type = IncidentsListPage; 
    map: Type = IncidentsMapPage;
    passes: Type = MountainPassesListPage;

    constructor() {
        this.incidents = IncidentsListPage;
        this.map = IncidentsMapPage;
        this.passes = MountainPassesListPage;
    }
}


@Page({
    templateUrl: 'build/pages/traffic/templates/incidents.html'
})
export class IncidentsListPage {
    constructor() {
    }

    log(message) {
        console.log(message);
    }
}


@Page({
    templateUrl: 'build/pages/traffic/templates/passes.html'
})
export class MountainPassesListPage {
    constructor() {
    }
}


@Page({
    templateUrl: 'build/pages/traffic/templates/incidents-map.html'
})
export class IncidentsMapPage {
    constructor() {
    }
}
