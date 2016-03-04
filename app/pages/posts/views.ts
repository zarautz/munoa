import 'rxjs/add/operator/map';

import {Http} from 'angular2/http';
import {Page, NavController, NavParams, ViewController} from 'ionic-angular';

import {PostsService, Post} from '../../services/api/posts';


@Page({
    templateUrl: 'build/pages/posts/templates/posts.html'
})
export class PostsListPage {
    metadata: any;
    items: Array<Post>;

    constructor(private _nav: NavController, private _service: PostsService) {
        this._service.load().subscribe(res => {
            this.metadata = res.metadata;
            this.items = res.posts;
        });
    }

    itemTapped($event, item) {
        this._nav.push(PostsDetailPage, {
            item: item
        });
    }
}


@Page({
    templateUrl: 'build/pages/posts/templates/post.html'
})
export class PostsDetailPage {
    item: Post;

    constructor(private _navParams: NavParams) {
        this.item = this._navParams.get('item');
    }
}
