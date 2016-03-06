import {Page} from 'ionic-angular';

import {BabelService} from '../../services/babel';


@Page({
    templateUrl: 'build/pages/settings/templates/settings.html'
})
export class SettingsPage {
    language: string;

    constructor(private _babel: BabelService) {
        this.language = 'eu';
    }

    changeLanguage() {
        this._babel.setLanguage(this.language);
    }
}
