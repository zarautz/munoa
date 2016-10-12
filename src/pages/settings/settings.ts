import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { BabelService, CacheService, ConfigService } from '../../services';


@Component({
    selector: 'munoa-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    language: string;
    languages: any;

    constructor(
        private alertCtrl: AlertController,
        private babel: BabelService, private cache: CacheService, private config: ConfigService
    ) {
        this.language = this.babel.language;
        this.languages = this.config.asArray(this.config.get('languages'));
    }

    changeLanguage() {
        this.babel.language = this.language;
    }

    clearCache() {
        let confirm = this.alertCtrl.create({
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
                        this.cache.clear();
                    }
                }
            ]
        });

        confirm.present(confirm);
    }
}
