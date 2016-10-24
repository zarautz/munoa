import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { FirebaseService } from '../services'

import { ForecastTabs } from '../pages/forecast';
import { PharmaciesPage } from '../pages/health';
import { PlacesGridPage } from '../pages/places';
import { PostsListPage } from '../pages/posts';
import { SettingsPage } from '../pages/settings';
import { TrafficTabs } from '../pages/traffic';


@Component({
    templateUrl: 'app.html'
})
export class MunoaApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = PlacesGridPage;
    pages: Array<{title: string, component: any}>;
    settingsPage: any;

    constructor(private firebase: FirebaseService, public platform: Platform) {
        this.initializeApp();

        this.pages = [
            { title: 'Forecast', component: ForecastTabs },
            { title: 'Posts', component: PostsListPage },
            { title: 'Traffic', component: TrafficTabs },
            { title: 'Places', component: PlacesGridPage },
            { title: 'Pharmacies', component: PharmaciesPage }
        ];

        this.settingsPage = {component: SettingsPage}
    }

    initializeApp() {
        this.firebase.initialize();
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
