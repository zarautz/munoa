import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';

import {ApiService} from '../api';


@Injectable()
export class PharmaciesService {
    private _endpoint: string = 'v1/pharmacies/duty/';
    private _metadata: any;

    constructor(private _api: ApiService) {
    }

    load() {
        // TODO: add a storage engine here, and check that we don´t call the API every time load() is called

        return this._api.get(this._endpoint).map(res => {
            this._metadata = res['meta'];
            return {
                'metadata': this._metadata,
            }
        });
    }
}
