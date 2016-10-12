import { Component } from '@angular/core';

import { ForecastService, Forecast } from '../../services/api';


@Component({
    selector: 'munoa-forecast-sea',
    templateUrl: 'forecast-sea.html'
})
export class ForecastSeaPage {
    forecast: Array<Forecast>;

    constructor(private service: ForecastService) {
        this.service.data$.subscribe(data => this.forecast = data.forecast);
        this.service.load();
    }
}
