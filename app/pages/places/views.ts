import {Page, NavController, NavParams} from 'ionic-angular';


@Page({
    templateUrl: 'build/pages/places/templates/places-section-grid.html'
})
export class PlacesGridPage {
    section: string;

    constructor(private nav: NavController) {
        this.section = 'places';
    }

    itemTapped($event) {
        this.nav.push(PlacesListPage);
    }
}


export class PoiGridPage extends PlacesGridPage {
    constructor(nav: NavController) {
        super(nav);
        this.section = 'poi';
    }
}


@Page({
    templateUrl: 'build/pages/places/templates/places.html'
})
export class PlacesListPage {
    items: Array<{ title: string, note: string }>;

    constructor(private nav: NavController) {
        this.items = [];
        for (let i = 1; i < 8; i++) {
            this.items.push({
                title: 'Place ' + i,
                note: 'This is place #' + i
            });
        }
    }

    itemTapped($event, item) {
        this.nav.push(PlacesDetailPage, {
            item: item
        });
    }
}


@Page({
    templateUrl: 'build/pages/places/templates/place.html'
})
export class PlacesDetailPage {
    item: any;

    constructor(private navParams: NavParams) {
        this.item = navParams.get('item');
    }
}
