import 'rxjs/add/operator/share';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { Place } from './place.model';


@Injectable()
export class PharmaciesService {
    data$: Observable<any>;
    private observer: any;
    private dataStore: {
        metadata: any,
        data: any,
        places: Array<Place>
    }

    constructor(private api: ApiService) {
        this.data$ = new Observable(observer => this.observer = observer).share();
    }

    load(): void {
        this.api.get('/v2/health/pharmacies/duty/', 7200).subscribe(res => {
            this.dataStore = {
                metadata: res.meta,
                data: res.data,
                places: []
            }

            for (let prop in res.data.places) {
                if (res.data.places.hasOwnProperty(prop)) {
                    let place = new Place();
                    place.assign(res.data.places[prop]);
                    this.dataStore.places.push(place);
                }
            }

            this.observer.next(this.dataStore);
        });
    }
}
