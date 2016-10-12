import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { BabelService } from './babel.service';
import { ConfigService } from './config.service';


@Injectable()
export class FirebaseService {
    constructor(private af: AngularFire, public babel: BabelService, public config: ConfigService) {}

    initialize(): void {
        this.af.database.object('/app/babel').subscribe(res => this.babel.messages = res);
        this.af.database.object('/app/config').subscribe(res => this.config.config = res);
    }
}
