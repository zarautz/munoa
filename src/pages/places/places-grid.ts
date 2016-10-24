import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlacesListPage } from './places-list';


@Component({
    selector: 'munoa-places-grid',
    templateUrl: 'places-grid.html'
})
export class PlacesGridPage {
    constructor(public navCtrl: NavController) {}

    itemTapped(event, typesString) {
        this.navCtrl.push(PlacesListPage, {
            types: typesString
        });
    }
}
