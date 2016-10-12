import { Component } from '@angular/core';

import { TrafficIncidentsPage } from './traffic-incidents';
import { TrafficIncidentsMap } from './traffic-incidents-map';
import { TrafficMountainPassesPage } from './traffic-passes';


@Component({
    templateUrl: 'traffic.html'
})
export class TrafficTabs {
    incidents: any = TrafficIncidentsPage;
    map: any = TrafficIncidentsMap;
    passes: any = TrafficMountainPassesPage;

    constructor() {}
}
