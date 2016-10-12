import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class CacheService {
    constructor(private storage: Storage) {}

    private seconds(): number {
        return Math.floor(Date.now() / 1000);
    }

    get(key: string, checkExpiration: boolean = true): Promise<any> {
        return this.storage.get(key).then(res => {
            if (res) {
                if (checkExpiration && res[0] < this.seconds()) {
                    throw 'Cache for key `' + key + '` has expired';
                } else {
                    return res[1];
                }
            } else {
                throw 'Can\'t find key `' + key + '`';
            }
        });
    }

    set(key: string, value: string, ttl: number = 3600) {
        return this.storage.set(key, [this.seconds() + ttl, value]);
    }

    remove(key: string) {
        return this.storage.remove(key);
    }

    clear() {
        return this.storage.clear();
    }
}
