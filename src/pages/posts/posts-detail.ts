import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Post } from '../../services/api';


@Component({
    selector: 'munoa-posts-detail',
    templateUrl: 'posts-detail.html'
})
export class PostsDetailPage {
    post: Post;

    constructor(private navParams: NavParams) {
        this.post = this.navParams.get('post');
    }
}
