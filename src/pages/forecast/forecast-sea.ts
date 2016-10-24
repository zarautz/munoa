import { Component } from '@angular/core';

import { ForecastService } from '../../services/api';


@Component({
    selector: 'munoa-forecast-sea',
    templateUrl: 'forecast-sea.html'
})
export class ForecastSeaPage {
    data: any;

    constructor(private service: ForecastService) {
        this.service.data$.subscribe(data => this.data = data);
        this.service.load();
    }
}
