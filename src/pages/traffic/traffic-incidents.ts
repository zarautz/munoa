import { Component } from '@angular/core';


@Component({
    templateUrl: 'traffic-incidents.html'
})
export class TrafficIncidentsPage {
    constructor() {}

    log(message) {
        console.log(message);
    }
}
