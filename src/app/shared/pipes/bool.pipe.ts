import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'bool',
    pure: false
})
export class BoolPipe implements PipeTransform {

    constructor() { }

    transform(value: boolean | number | string) {
        if (value === 0 || value === false || value === 'false') {
            return 'label.no';
        }
        if (value === 1 || value === true || value === 'true') {
            return 'label.yes';
        }
        return null;
    }

}
