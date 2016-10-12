import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/share';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { BabelService } from '../babel.service';
import { Forecast } from './forecast.model';


@Injectable()
export class ForecastService {
    data$: Observable<any>;
    private observer: any;
    private dataStore: {
        metadata: any,
        forecast: Array<Forecast>,
        images: any
    }

    constructor(private api: ApiService, private babel: BabelService) {
        this.data$ = new Observable(observer => this.observer = observer).share();
    }

    load() {
        Observable.forkJoin(
            this.api.get('/v2/forecast/', 3600),
            this.api.get('/v2/forecast/weather/codes/', 3600 * 24 * 7, {'language': this.babel.language})
        ).subscribe(res => {
            this.dataStore = {
                metadata: res[0]['meta'],
                forecast: [],
                images: res[0]['live']
            }
            res[0]['data'].forEach((f) => {
                this.dataStore.forecast.push(new Forecast(f, res[1]['data']));
            });

            this.observer.next(this.dataStore);
        });
    }
}
