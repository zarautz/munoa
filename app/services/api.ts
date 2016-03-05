import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';


export const API_HOST = 'http://data.zarautz.xyz/';


@Injectable()
export class ApiService {
    private _host: string;

    constructor(private _http: Http) {
    }

    get(endpoint: string) {
        return this._http.get(API_HOST + endpoint).map((res) => res.json());
    }
}
