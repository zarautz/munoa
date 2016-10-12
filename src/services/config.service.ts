import { FirebaseObjectObservable } from 'angularfire2';


export class ConfigService {
    public config: FirebaseObjectObservable<any> = null;

    constructor() {}

    asArray(obj: {}): {key: string, value: any}[] {
        let out = [];

        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                out.push({key: k, value: obj[k]});
            }
        }

        return out;
    }

    get(configKey: string): any {
        if (this.config && configKey in this.config) {
            return this.config[configKey];
        } else {
            return configKey;
        }
    }
}
