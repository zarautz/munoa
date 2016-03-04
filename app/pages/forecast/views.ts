import {Type} from 'angular2/core';
import {Page} from 'ionic-angular';

import {ForecastService, Forecast} from '../../services/api/forecast';


@Page({
    templateUrl: 'build/pages/forecast/templates/forecast-tabs.html'
})
export class ForecastTabs {
    forecast: any;
    kosta: Type = KostaPage;
    sea: Type = SeaPage;
    weather: Type = WeatherPage;

    constructor() {
        this.kosta = KostaPage;
        this.sea = SeaPage;
        this.weather = WeatherPage;
    }
}


@Page({
    templateUrl: 'build/pages/forecast/templates/kosta.html'
})
export class KostaPage {
    snapshots: Array<any>;
    timexImages: Array<any>;

    constructor(private _service: ForecastService) {
        this._service.load().subscribe(res => {
            this.snapshots = res.images.snapshots;
            this.timexImages = res.images.timex;
        });
    }
}


@Page({
    templateUrl: 'build/pages/forecast/templates/sea.html'
})
export class SeaPage {
    forecast: Array<Forecast>;

    constructor(private _service: ForecastService) {
        this._service.load().subscribe(res => this.forecast = res.forecast);
    }
}


@Page({
    templateUrl: 'build/pages/forecast/templates/weather.html'
})
export class WeatherPage {
    forecast: Array<Forecast>;

    constructor(private _service: ForecastService) {
        this._service.load().subscribe(res => this.forecast = res.forecast);
    }
}
