import 'rxjs/add/operator/map';

import {Injectable} from 'angular2/core';

import {ApiService} from '../api';


export class Post {
    constructor(private _data: any) {
        for (var property in this._data) {
            this[property] = this._data[property];
        }
    }

    getThumbnailImage() {
        var keys = Object.keys(this._data.contentImages);

        if (keys.length > 0) {
            return this._data.contentImages[keys[0]].source.square;
        } else {
            return '';
        }
    };
}


@Injectable()
export class PostsService {
    private _endpoint: string = 'v1/posts/hitza/';
    private _posts: Array<Post> = [];
    private _metadata: any;

    constructor(private _api: ApiService) {
    }

    load() {
        // TODO: add a storage engine here, and check that we don´t call the API every time load() is called
        this._posts = [];

        return this._api.get(this._endpoint).map(res => {
            this._metadata = res['meta'];
            res['data'].forEach((p) => {
                this._posts.push(new Post(p));
            });

            return {
                'metadata': this._metadata,
                'posts': this._posts
            }
        });
    }
}
