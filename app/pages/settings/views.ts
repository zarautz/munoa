import {Page} from 'ionic-angular';

import {BabelService} from '../../services/babel';


@Page({
    templateUrl: 'build/pages/settings/templates/settings.html'
})
export class SettingsPage {
    constructor(private babel: BabelService) {
    }
}
