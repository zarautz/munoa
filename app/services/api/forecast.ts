import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';

import {ApiService} from '../api';


export class Forecast {
    constructor(private _data: any) {
        for (var property in this._data) {
            this[property] = this._data[property];
        }
    }

    getDate() {
        /* just testing... */
        return this._data.date;
    }
}


@Injectable()
export class ForecastService {
    private _endpoint: string = 'v1/forecast/';
    private _metadata: any;
    private _forecast: Array<Forecast> = [];
    private _images: any;

    constructor(private _api: ApiService) {
    }

    load() {
        // TODO: add a storage engine here, and check that we don´t call the API every time load() is called
        this._forecast = [];

        return this._api.get(this._endpoint).map((res) => {
            this._metadata = res['meta'];
            this._images = res['live'];
            res['data'].forEach((f) => {
                this._forecast.push(new Forecast(f));
            });

            return {
                'metadata': this._metadata,
                'forecast': this._forecast,
                'images': this._images
            }
        });
    }
}
