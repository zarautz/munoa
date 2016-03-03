import {Type} from 'angular2/core';
import {Page} from 'ionic-angular';

import {ForecastService} from '../../services/forecast';


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

    constructor(private service: ForecastService) {
        this.service.load().subscribe(res => {
            this.snapshots = res.live.snapshots;
            this.timexImages = res.live.timex;
        });
    }
}


@Page({
    templateUrl: 'build/pages/forecast/templates/sea.html'
})
export class SeaPage {
    forecast: any;

    constructor(private service: ForecastService) {
        this.service.load().subscribe(res => this.forecast = res.data);
    }
}


@Page({
    templateUrl: 'build/pages/forecast/templates/weather.html'
})
export class WeatherPage {
    forecast: any;

    constructor(private service: ForecastService) {
        this.service.load().subscribe(res => this.forecast = res.data);
    }
}
