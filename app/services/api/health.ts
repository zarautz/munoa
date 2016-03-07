import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {Observable} from 'rxjs/Observable';
import {Injectable} from 'angular2/core';

import {ApiService} from '../api';


@Injectable()
export class PharmaciesService {
    data$: Observable<any>;
    private _observer: any;
    private _dataStore: {
        metadata: any
    }

    private _metadata: any;

    constructor(private _api: ApiService) {
        this.data$ = new Observable(observer => this._observer = observer).share();
    }

    load() {
        // TODO: add a storage engine here, and check that we don´t call the API every time load() is called
        this._api.getPharmaciesDuty().subscribe(res => {
            this._dataStore = {
                metadata: res['meta']
            }

            // TODO: update storage engine

            this._observer.next(this._dataStore);
        });
    }
}