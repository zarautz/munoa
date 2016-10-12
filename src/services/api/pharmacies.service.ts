import 'rxjs/add/operator/share';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';


@Injectable()
export class PharmaciesService {
    data$: Observable<any>;
    private observer: any;
    private dataStore: {
        metadata: any,
        data: any
    }

    constructor(private api: ApiService) {
        this.data$ = new Observable(observer => this.observer = observer).share();
    }

    load() {
        this.api.get('/v2/health/pharmacies/duty/', 7200).subscribe(res => {
            this.dataStore = {
                metadata: res['meta'],
                data: res['data']
            }

            this.observer.next(this.dataStore);
        });
    }
}
