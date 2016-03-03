import 'rxjs/add/operator/map';

import {Http} from 'angular2/http';
import {Page, NavController, NavParams, ViewController} from 'ionic-angular';

import {PostManager} from '../../models/post';
import {PostsService} from '../../services/posts';


@Page({
    templateUrl: 'build/pages/posts/templates/posts.html'
})
export class PostsListPage {
    items: Array<any>;

    constructor(private nav: NavController, private navParams: NavParams, private service: PostsService) {
        this.service.load().subscribe(res => this.items = new PostManager(res.data).objects);
    }

    itemTapped($event, item) {
        this.nav.push(PostsDetailPage, {
            item: item
        });
    }
}


@Page({
    templateUrl: 'build/pages/posts/templates/post.html'
})
export class PostsDetailPage {
    item: any;

    constructor(private navParams: NavParams) {
        this.item = navParams.get('item');
    }
}
