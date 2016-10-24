import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlacesService } from '../../services/api';
import { PlacesDetailPage } from './places-detail';
import { Place } from '../../services/api';


@Component({
    selector: 'munoa-places-list',
    templateUrl: 'places-list.html'
})
export class PlacesListPage {
    data: any;

    constructor(private service: PlacesService, public navCtrl: NavController, public navParams: NavParams) {
        this.service.data$.subscribe(data => this.data = data);
        this.service.filter(navParams.get('types')).load();
    }

    placeTapped(event, place) {
        this.navCtrl.push(PlacesDetailPage, {
            place: place
        });
    }
}
