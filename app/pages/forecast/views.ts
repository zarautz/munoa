import {Type} from 'angular2/core';
import {Page} from 'ionic-angular';

import {ForecastService, Forecast} from '../../services/api/forecast';


@Page({
    templateUrl: 'build/pages/forecast/templates/forecast-tabs.html'
})
export class ForecastTabs {
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
    images: {
        snapshots: Array<any>,
        timex: Array<any>
    }

    constructor(private _service: ForecastService) {
        this._service.data$.subscribe(data => this.images = data.images);
        this._service.load();
    }
}


@Page({
    templateUrl: 'build/pages/forecast/templates/sea.html'
})
export class SeaPage {
    forecast: Array<Forecast>;

    constructor(private _service: ForecastService) {
        this._service.data$.subscribe(data => this.forecast = data.forecast);
        this._service.load();
    }
}


@Page({
    templateUrl: 'build/pages/forecast/templates/weather.html'
})
export class WeatherPage {
    forecast: Array<Forecast>;

    constructor(private _service: ForecastService) {
        this._service.data$.subscribe(data => this.forecast = data.forecast);
        this._service.load();
    }
}
