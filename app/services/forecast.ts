import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ForecastService {
    private endpoint: string = 'http://data.zarautz.xyz/v1/forecast/';

    constructor(private http: Http) {
    }

    load() {
        return this.http.get(this.endpoint).map(res => res.json())
    }
}
