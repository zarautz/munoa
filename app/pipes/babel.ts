import {Pipe, PipeTransform} from 'angular2/core';

import {BabelService} from '../services/babel';


@Pipe({
    name: 'babel',
    pure: false
})
export class BabelPipe implements PipeTransform {
    constructor(private babel: BabelService) {
    }

    transform(value, args) {
        return this.babel.translate(value);
    }

    supports(obj) {
        return true;
    }
}
