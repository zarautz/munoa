import { FirebaseObjectObservable } from 'angularfire2';


export class BabelService {
    public language: string = 'eu';
    public messages: FirebaseObjectObservable<any> = null;

    constructor() {}

    translate(messageKey: string) {
        try {
            return this.messages[messageKey][this.language];
        } catch (err) {
            return messageKey + ':' + this.language;
        }
    }
}
