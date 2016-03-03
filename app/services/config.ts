export class ConfigService {
    ref: Firebase;
    config: any = {};

    constructor() {
        this.ref = new Firebase('https://munoa.firebaseio.com/app/config');
        this.ref.on('value', (snapshot) => this.config = snapshot.val());
    }

    get(configKey: string) {
        if (configKey in this.config) {
            return this.config[configKey];
        } else {
            return configKey;
        }
    }
}
