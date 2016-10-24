import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { CacheService } from './cache.service';


export const API_HOST = 'https://data.zarautz.xyz';


@Injectable()
export class ApiService {
    constructor(private http: Http, private cache: CacheService) {}

    get(endpoint: string, ttl: number = 3600, params: {[id: string]: string} = {}): Observable<any> {
        let cacheKey: string;
        let searchParams: URLSearchParams = new URLSearchParams();

        // Build searchParams AND sort them to generate a unique cache key
        for (let key in params) searchParams.set(key, params[key]);
        cacheKey = endpoint.concat(searchParams.toString().split('&').sort().join('&'));

        // 1. Try the cache
        // 2. If no key is found, or key has expired, connect with the OpenZarautz API
        // 3. Use an expired cache as fallback when no connection is possible
        return Observable.fromPromise(this.cache.get(cacheKey)).catch(caught => {
            return this.http.get(API_HOST + endpoint, {search: searchParams}).map(res => {
                this.cache.set(cacheKey, res.json(), ttl);
                return res.json();
            }).catch(caught => Observable.fromPromise(this.cache.get(cacheKey, false)));
        });
    }
}
