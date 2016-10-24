import { Component } from '@angular/core';

import { ForecastService } from '../../services/api';


@Component({
    selector: 'munoa-forecast-weather',
    templateUrl: 'forecast-weather.html'
})
export class ForecastWeatherPage {
    data: any;

    constructor(private service: ForecastService) {
        this.service.data$.subscribe(data => this.data = data);
        this.service.load();
    }
}
