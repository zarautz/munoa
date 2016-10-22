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
        try {
            return this.config[configKey];
        } catch (err) {
            return configKey;
        }
    }
}
