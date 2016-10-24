import { Component } from '@angular/core';

import { ForecastService } from '../../services/api';


@Component({
    selector: 'munoa-forecast-live',
    templateUrl: 'forecast-live.html'
})
export class ForecastLivePage {
    data: any

    constructor(private service: ForecastService) {
        this.service.data$.subscribe(data => this.data = data);
        this.service.load();
    }
}
