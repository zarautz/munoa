import {Injectable} from 'angular2/core';
import {Storage, SqlStorage} from 'ionic-angular';


@Injectable()
export class CacheService {
    private _storage: Storage = new Storage(SqlStorage);

    construct() {
    }

    initialize(): Promise<any> {
        let q = 'create table if not exists cache (key text primary key unique, value text, expiresAt integer)';

        return this._storage.query(q);
    }

    get(key: string, checkExpiration: boolean = true): Promise<any> {
        let q = 'select value from cache where key = \'' + key + '\'';

        if (checkExpiration) {
            q += ' and expiresAt > ' + (new Date().getTime());
        }

        return this._storage.query(q).then(data => {
            if (data.res.rows.length > 0) {
                return data.res.rows.item(0).value;
            } else {
                throw 'Can\'t find key `' + key + '`';
            }
        });
    }

    set(key: string, value: string, ttl: number = 60): Promise<any>  {
        let q = 'insert or replace into cache (key, value, expiresAt) ' +
                'values (\'' + key + '\', \'' + value + '\', \'' + (new Date().getTime() + (ttl * 1000)) + '\')';

        return this._storage.query(q);
    }

    remove(key: string): Promise<any> {
        let q = 'delete from cache where key = \'' + key + '\'';

        return this._storage.query(q);
    }

    clear(): Promise<any> {
        let q = 'drop table cache';

        return this._storage.query(q);
    }
}
