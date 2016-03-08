import {Page, Alert, NavController} from 'ionic-angular';

import {BabelService} from '../../services/babel';
import {CacheService} from '../../services/cache';


@Page({
    templateUrl: 'build/pages/settings/templates/settings.html'
})
export class SettingsPage {
    language: string;

    constructor(private _nav: NavController, private _babel: BabelService, private _cache: CacheService) {
        this.language = 'eu';
    }

    changeLanguage() {
        this._babel.setLanguage(this.language);
    }

    clearCache() {
        let confirm = Alert.create({
            title: 'Are you sure you want to empty the cache?',
            message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
                     'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            buttons: [
                {
                    text: 'Disagree',
                    handler: () => {}
                },
                {
                    text: 'Agree',
                    handler: () => {
                        this._cache.clear().then(res => this._cache.initialize());
                    }
                }
            ]
        });

        this._nav.present(confirm);
    }
}
