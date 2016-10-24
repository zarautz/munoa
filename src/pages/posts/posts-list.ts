import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PostsService } from '../../services/api';
import { PostsDetailPage } from './posts-detail';


@Component({
    selector: 'munoa-posts-list',
    templateUrl: 'posts-list.html'
})
export class PostsListPage {
    selectedPost: any;
    data: any;

    constructor(private service: PostsService, public navCtrl: NavController) {
        this.service.data$.subscribe(data => this.data = data);
        this.service.load();
    }

    itemTapped(event, post) {
        this.navCtrl.push(PostsDetailPage, {
            post: post
        });
    }
}
