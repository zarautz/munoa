import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';

import {BabelService} from './babel';


export const API_HOST = 'http://data.zarautz.xyz';


@Injectable()
export class ApiService {
    private _params: URLSearchParams;

    constructor(private _http: Http, private _babel: BabelService) {
    }

    buildParams(params: {[id: string]: string} = {}) {
        this._params = new URLSearchParams();
        this._params.set('language', this._babel.getLanguage());
    }

    get(endpoint: string, params: any = {}) {
        return this._http.get(API_HOST + endpoint).map((res) => {
            return res.json();
        }, (err) => console.log(err));
    }

    getForecast() {
        return this.get('/v1/forecast/');
    }

    getForecastWeatherCodes(params: {[id: string]: string} = {}) {
        this.buildParams(params);
        return this.get('/v1/forecast/weather/codes/');
    }

    getPharmaciesDuty() {
        this.buildParams();
        return this.get('/v1/pharmacies/duty/');
    }

    getPosts(source: string = 'hitza') {
        return this.get('/v1/posts/' + source + '/');
    }
}
