import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';


export class Forecast {
    constructor(private _data) {
        for (var property in _data) {
            this[property] = _data[property];
        }
    }

    getDate() {
        /* just testing... */
        return this._data.date;
    }
}

@Injectable()
export class ForecastService {
    private _endpoint: string = 'http://data.zarautz.xyz/v1/forecast/';
    private _forecast: Array<Forecast> = [];
    private _metadata: any;
    private _images: any;

    constructor(private _http: Http) {
    }

    load() {
        // TODO: add a storage engine here, and check that we don´t call the API every time load() is called
        this._forecast = [];

        return this._http.get(this._endpoint)
            .map((res) => res.json())
            .map((res) => {
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
