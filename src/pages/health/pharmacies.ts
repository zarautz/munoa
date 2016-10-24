import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PharmaciesService } from '../../services/api';
import { PlacesDetailPage } from '../places/places-detail';


@Component({
    selector: 'munoa-health-pharmacies',
    templateUrl: 'pharmacies.html'
})
export class PharmaciesPage {
    data: any;

    constructor(private service: PharmaciesService, public navCtrl: NavController) {
        this.service.data$.subscribe(data => this.data = data);
        this.service.load();
    }

    placeTapped(event, place) {
        this.navCtrl.push(PlacesDetailPage, {
            place: place
        });
    }
}
