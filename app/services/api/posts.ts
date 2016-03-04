import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';


export class Post {
    contentImages: {};

    constructor(private data) {
        for (var property in data) {
            this[property] = data[property];
        }
    }

    getThumbnailImage() {
        var keys = Object.keys(this.contentImages);

        if (keys.length > 0) {
            return this.contentImages[keys[0]].source.square;
        } else {
            return '';
        }
    };
}

@Injectable()
export class PostsService {
    private _endpoint: string = 'http://data.zarautz.xyz/v1/posts/hitza/';
    private _posts: Array<Post> = [];
    private _metadata: any;

    constructor(private _http: Http) {
    }

    load() {
        // TODO: add a storage engine here, and check that we don´t call the API every time load() is called
        this._posts = [];

        return this._http.get(this._endpoint)
            .map(res => res.json())
            .map(res => {
                this._metadata = res['meta'];
                res['data'].forEach((f) => {
                    this._posts.push(new Post(f));
                });

                return {
                    'metadata': this._metadata,
                    'posts': this._posts
                }
            });
    }
}
