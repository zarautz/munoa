import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';

import { FIREBASE_CONFIG } from '../../config/firebase'

import { MunoaApp } from './app.component';
import { ForecastTabs, ForecastLivePage, ForecastSeaPage, ForecastWeatherPage } from '../pages/forecast';
import { PharmaciesPage } from '../pages/health';
import { PlacesGridPage, PlacesListPage, PlacesDetailPage } from '../pages/places';
import { PostsListPage, PostsDetailPage } from '../pages/posts';
import { SettingsPage } from '../pages/settings';
import { TrafficTabs, TrafficIncidentsPage, TrafficMountainPassesPage, TrafficIncidentsMap } from '../pages/traffic';
import { BabelPipe } from '../pipes';
import { ApiService, BabelService, CacheService, ConfigService, FirebaseService } from '../services';
import { ForecastService, PharmaciesService, PlacesService, PostsService } from '../services/api';


@NgModule({
    declarations: [
        MunoaApp,
        ForecastTabs, ForecastLivePage, ForecastSeaPage, ForecastWeatherPage,
        PharmaciesPage,
        PlacesGridPage, PlacesListPage, PlacesDetailPage,
        PostsListPage, PostsDetailPage,
        SettingsPage,
        TrafficTabs, TrafficIncidentsPage, TrafficMountainPassesPage, TrafficIncidentsMap,
        BabelPipe
    ],
    imports: [
        IonicModule.forRoot(MunoaApp),
        AngularFireModule.initializeApp(FIREBASE_CONFIG)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MunoaApp,
        ForecastTabs, ForecastLivePage, ForecastSeaPage, ForecastWeatherPage,
        PharmaciesPage,
        PlacesGridPage, PlacesListPage, PlacesDetailPage,
        PostsListPage, PostsDetailPage,
        SettingsPage,
        TrafficTabs, TrafficIncidentsPage, TrafficMountainPassesPage, TrafficIncidentsMap
    ],
    providers: [
        Storage,
        ApiService, BabelService, CacheService, ConfigService, FirebaseService,
        ForecastService, PharmaciesService, PlacesService, PostsService
    ]
})
export class AppModule {}
