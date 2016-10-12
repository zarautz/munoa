import { Component } from '@angular/core';

import { ForecastLivePage } from './forecast-live';
import { ForecastSeaPage } from './forecast-sea';
import { ForecastWeatherPage } from './forecast-weather';


@Component({
    selector: 'munoa-forecast',
    templateUrl: 'forecast.html'
})
export class ForecastTabs {
    live: any = ForecastLivePage;
    sea: any = ForecastSeaPage;
    weather: any = ForecastWeatherPage;

    constructor() {}
}
