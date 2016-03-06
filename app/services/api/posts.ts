import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import {Observable} from 'rxjs/Observable';
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
    data$: Observable<any>;
    private _observer: any;
    private _source: string = 'hitza';
    private _dataStore: {
        metadata: any,
        posts: Array<Post>
    }

    constructor(private _api: ApiService) {
        this.data$ = new Observable(observer => this._observer = observer).share();
    }

    load() {
        // TODO: add a storage engine here, and check that we don´t call the API every time load() is called
        this._api.getPosts(this._source).subscribe(res => {
            this._dataStore = {
                metadata: res['meta'],
                posts: []
            }

            res['data'].forEach((p) => {
                this._dataStore.posts.push(new Post(p));
            });
            
            // TODO: update storage engine

            this._observer.next(this._dataStore);
        });
    }
}
