import {Page, NavController, NavParams} from 'ionic-angular';

import {PlacesListPage} from '../places/views';
import {PharmaciesService} from '../../services/api/health';


@Page({
    templateUrl: 'build/pages/places/templates/places-section-grid.html'
})
export class HealthCareGridPage {
    section: string = 'health';
    metadata: any;

    constructor(private _nav: NavController, private _service: PharmaciesService) {
        this._service.load().subscribe(res => {
            this.metadata = res.metadata;
        });
    }

    itemTapped($event) {
        this._nav.push(PlacesListPage);
    }
}


@Page({
    templateUrl: 'build/pages/health/templates/pharmacies.html'
})
export class PharmaciesPage {
    constructor() {
    }
}
