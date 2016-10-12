import { Pipe, PipeTransform } from '@angular/core';

import { BabelService } from '../services';


@Pipe({
    name: 'babel',
    pure: false
})
export class BabelPipe implements PipeTransform {
    constructor(private babel: BabelService) {}

    transform(value, args) {
        return this.babel.translate(value);
    }
}
