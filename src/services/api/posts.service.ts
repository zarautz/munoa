import 'rxjs/add/operator/share';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import { Post } from './post.model';


@Injectable()
export class PostsService {
    data$: Observable<any>;
    private observer: any;
    private source: string = 'hitza';
    private dataStore: {
        metadata: any,
        posts: Array<Post>
    }

    constructor(private api: ApiService) {
        this.data$ = new Observable(observer => this.observer = observer).share();
    }

    load(): void {
        this.api.get('/v2/posts/' + this.source + '/', 3600).subscribe(res => {
            this.dataStore = {
                metadata: res.meta,
                posts: []
            }

            res.data.forEach((obj) => {
                let post = new Post();
                post.assign(obj);
                this.dataStore.posts.push(post);
            });

            this.observer.next(this.dataStore);
        });
    }
}
