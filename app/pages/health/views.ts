import {Page, NavController, NavParams} from 'ionic-angular';

import {PlacesGridPage} from '../places/views';


export class HealthCareGridPage extends PlacesGridPage {
    constructor(nav: NavController) {
        super(nav);
        this.section = 'health';
    }
}


@Page({
    templateUrl: 'build/pages/health/templates/pharmacies.html'
})
export class PharmaciesPage {
    constructor() {
    }
}
