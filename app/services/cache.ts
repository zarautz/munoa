import {Injectable} from 'angular2/core';
import {Storage, SqlStorage} from 'ionic-angular';


@Injectable()
export class CacheService {
    private _storage: Storage = new Storage(SqlStorage);
    private _table: string = 'cache';

    construct() {
    }

    initialize() {
        this._storage.query('create table if not exists ' + this._table + ' ' +
                            '(key text primary key unique, value text, expiresAt integer)');
    }

    get(key: string): Promise<any> {
        let timestamp = new Date().getTime();

        return this._storage.query('select value from ' + this._table + ' ' +
                                   'where key = \'' + key + '\' and expiresAt > ' + timestamp).then(data => {
            if (data.res.rows.length > 0) {
                return data.res.rows.item(0).value;
            } else {
                throw new Error('No data found');
            }
        });
    }

    set(key: string, value: string, ttl: number = 60): Promise<any>  {
        let expiresAt = new Date().getTime() + (ttl * 1000);

        return this._storage.query('insert or replace into ' + this._table + ' (key, value, expiresAt) ' +
                                   'values (\'' + key + '\', \'' + value + '\', \'' + expiresAt + '\')');
    }

    remove(key: string): Promise<any> {
        return this._storage.query('delete from ' + this._table + ' where key = \'' + key + '\'');
    }

    flush(): Promise<any> {
        return this._storage.query('drop table ' + this._table).then(res => this.initialize());
    }
}
