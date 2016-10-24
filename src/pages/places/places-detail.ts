import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Place } from '../../services/api';


@Component({
    selector: 'munoa-places-detail',
    templateUrl: 'places-detail.html'
})
export class PlacesDetailPage {
    place: Place;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.place = navParams.get('place');
    }
}
