import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';

import {BabelService} from './babel';
import {CacheService} from './cache';


export const API_HOST = 'http://data.zarautz.xyz';


@Injectable()
export class ApiService {
    private _params: URLSearchParams;

    constructor(private _http: Http, private _babel: BabelService, protected _cache: CacheService) {
    }

    buildParams(params: {[id: string]: string} = {}) {
        this._params = new URLSearchParams();
        this._params.set('language', this._babel.getLanguage());
    }

    get(endpoint: string, params: any = {}): Observable<any> {
        let cacheSource = Observable.fromPromise(this._cache.get(endpoint)).map(res => JSON.parse(res));
        let apiSource = this._http.get(API_HOST + endpoint).map(res => {
            this._cache.set(endpoint, res.text());
            return res.json();
        });

        return cacheSource.catch(err => apiSource);
    }

    getForecast(): Observable<any> {
        return this.get('/v1/forecast/');
    }

    getForecastWeatherCodes(params: {[id: string]: string} = {}): Observable<any> {
        this.buildParams(params);
        return this.get('/v1/forecast/weather/codes/');
    }

    getPharmaciesDuty(): Observable<any> {
        this.buildParams();
        return this.get('/v1/pharmacies/duty/');
    }

    getPosts(source: string = 'hitza'): Observable<any> {
        return this.get('/v1/posts/' + source + '/');
    }
}
