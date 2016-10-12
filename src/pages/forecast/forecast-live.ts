import { Component } from '@angular/core';

import { ForecastService } from '../../services/api';


@Component({
    selector: 'munoa-forecast-live',
    templateUrl: 'forecast-live.html'
})
export class ForecastLivePage {
    images: {
        snapshots: Array<any>,
        timex: Array<any>
    }

    constructor(private service: ForecastService) {
        this.service.data$.subscribe(data => this.images = data.images);
        this.service.load();
    }
}
