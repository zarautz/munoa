import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PostsService, Post } from '../../services/api';
import { PostsDetailPage } from './posts-detail';


@Component({
    selector: 'munoa-posts-list',
    templateUrl: 'posts-list.html'
})
export class PostsListPage {
    selectedItem: any;
    metadata: any;
    items: Array<Post>;

    constructor(private service: PostsService, public navCtrl: NavController, public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        this.service.data$.subscribe(data => {
            this.metadata = data.metadata;
            this.items = data.posts;
        });
        this.service.load();
    }

    itemTapped(event, item) {
        this.navCtrl.push(PostsDetailPage, {
            item: item
        });
    }
}
