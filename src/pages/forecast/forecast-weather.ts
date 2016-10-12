import { Component } from '@angular/core';

import { ForecastService, Forecast } from '../../services/api';


@Component({
    selector: 'munoa-forecast-weather',
    templateUrl: 'forecast-weather.html'
})
export class ForecastWeatherPage {
    forecast: Array<Forecast>;

    constructor(private service: ForecastService) {
        this.service.data$.subscribe(data => this.forecast = data.forecast);
        this.service.load();
    }
}
