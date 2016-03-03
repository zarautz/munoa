import {Page, Modal, NavController, NavParams, ViewController} from 'ionic-angular';

import {PlacesDetailPage} from '../places/views';


@Page({
    templateUrl: 'build/pages/events/templates/events.html'
})
export class EventsListPage {
    items: Array<{ title: string, note: string }>;

    constructor(private nav: NavController) {
        this.items = [];
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Event ' + i,
                note: 'This is event #' + i
            });
        }
    }

    itemTapped($event, item) {
        this.nav.push(EventsDetailPage, {
            item: item
        });
    }

    presentInfoModal() {
        let modal = Modal.create(KulturklikInfoModal);
        this.nav.present(modal)
    }
}


@Page({
    templateUrl: 'build/pages/events/templates/event.html'
})
export class EventsDetailPage {
    item: any;

    constructor(private nav: NavController, private navParams: NavParams) {
        this.item = navParams.get('item');
    }

    itemTapped($event, item) {
        this.nav.push(PlacesDetailPage, {
            item: {
                title: 'Place for event',
                note: 'This is a place for an event'
            }
        });
    }
}


@Page({
    templateUrl: 'build/pages/events/templates/kulturklik-info-modal.html'
})
class KulturklikInfoModal {
    constructor(private view: ViewController) {
    }

    dismiss() {
        this.view.dismiss({});
    }
}
