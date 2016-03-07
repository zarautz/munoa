import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';

import {ApiService} from '../api';


export class Forecast {
    constructor(private _data: any, private _codes: any) {
        for (var property in this._data) {
            this[property] = this._data[property];
        }

        // Get `name` string for weather code.
        this._data.weather.forecast.forEach((f) => {
            f.codeToString = this._codes[f.code].name;
        });
    }

    getDate() {
        /* just testing... */
        return this._data.date;
    }
}


@Injectable()
export class ForecastService {
    data$: Observable<any>;
    private _observer: any;
    private _dataStore: {
        metadata: any,
        forecast: Array<Forecast>,
        images: any
    }

    constructor(private _api: ApiService) {
        this.data$ = new Observable(observer => this._observer = observer).share();
    }

    load() {
        Observable.forkJoin(
            this._api.getForecast(),
            this._api.getForecastWeatherCodes()
        ).subscribe(res => {
            this._dataStore = {
                metadata: res[0]['meta'],
                forecast: [],
                images: res[0]['live']
            }
            res[0]['data'].forEach((f) => {
                this._dataStore.forecast.push(new Forecast(f, res[1]['data']));
            });

            this._observer.next(this._dataStore);
        });
    }
}
