import 'rxjs/add/operator/share';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { Place } from './place.model';


@Injectable()
export class PlacesService {
    data$: Observable<any>;
    private observer: any;
    private typesFilter: {} = {};
    private dataStore: {
        metadata: any,
        places: Array<Place>
    }

    constructor(private api: ApiService) {
        this.data$ = new Observable(observer => this.observer = observer).share();
    }

    filter(typesString: string): PlacesService {
        this.typesFilter = {
            types: typesString
        }

        return this;
    }

    load(): void {
        this.api.get('/v2/places/', 3600, this.typesFilter).subscribe(res => {
            this.dataStore = {
                metadata: res.meta,
                places: []
            }

            res.data.forEach((obj) => {
                let place = new Place();
                place.assign(obj);
                this.dataStore.places.push(place);
            });

            this.observer.next(this.dataStore);
        });
    }
}
