import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'noDate',
    pure: false
})
export class NoDatePipe implements PipeTransform {

    constructor() { }

    transform(value: any) {
        if (value !== 0 && value !== false && !value || (value instanceof String && value && String(value).trim() === '') ) {
            return 'label.noDate';
        }
        return value;
    }
}
