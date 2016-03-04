/// <reference path="../typings/main.d.ts" />
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {App, IonicApp, Platform, Storage, SqlStorage} from 'ionic-angular';
import {Type, provide, PLATFORM_PIPES} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {EventsListPage} from './pages/events/views';
import {ForecastTabs} from './pages/forecast/views';
import {HealthCareGridPage} from './pages/health/views';
import {PlacesGridPage, PoiGridPage} from './pages/places/views';
import {PostsListPage} from './pages/posts/views';
import {SettingsPage} from './pages/settings/views';
import {TrafficTabs} from './pages/traffic/views';

import {BabelPipe} from './pipes/babel';

import {BabelService} from './services/babel';
import {ConfigService} from './services/config';

import {ForecastService} from './services/api/forecast';
import {PostsService} from './services/api/posts';


@App({
    templateUrl: 'build/app.html',
    config: {},
    providers: [
        HTTP_PROVIDERS,
        BabelService, ConfigService,
        ForecastService, PostsService,
        provide(PLATFORM_PIPES, {useValue: [BabelPipe], multi: true})
    ]
})
class MyApp {
    storage: Storage;
    rootPage: Type = PostsListPage;
    settingsPage: {component: Type};
    pages: Array<{title: string, icon: string, component: Type}>

    constructor(private app: IonicApp, private platform: Platform, private babel: BabelService) {
        this.initializeApp();
        this.storage = new Storage(SqlStorage);
        this.pages = [
            {title: 'news', icon: 'paper', component: PostsListPage},
            {title: 'events', icon: 'calendar', component: EventsListPage},
            {title: 'forecast', icon: 'water', component: ForecastTabs},
            {title: 'places', icon: 'pin', component: PlacesGridPage},
            {title: 'health', icon: 'medkit', component: HealthCareGridPage},
            {title: 'poi', icon: 'images', component: PoiGridPage},
            {title: 'traffic', icon: 'car', component: TrafficTabs}
        ];
        this.settingsPage = {component: SettingsPage}
    }

    setLanguage(language) {
        this.babel.setLanguage(language);
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let's hide the keyboard accessory bar (only works natively) since
            // that's a better default:
            //
            // Keyboard.setAccessoryBarVisible(false);
            //
            // For example, we might change the StatusBar color. This one below is
            // good for dark backgrounds and light text:
            // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        let nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    }
}
