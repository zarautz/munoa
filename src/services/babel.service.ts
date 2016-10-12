import { FirebaseObjectObservable } from 'angularfire2';


export class BabelService {
    public language: string = 'eu';
    public messages: FirebaseObjectObservable<any> = null;

    constructor() {}

    translate(messageKey: string) {
        if (this.messages && messageKey in this.messages) {
            return this.messages[messageKey][this.language];
        } else {
            return messageKey + ':' + this.language;
        }
    }
}
