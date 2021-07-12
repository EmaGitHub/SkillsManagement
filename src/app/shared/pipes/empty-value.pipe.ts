import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'empty',
    pure: false
})
export class EmptyValuePipe implements PipeTransform {

    constructor() { }

    transform(value: any) {
        if (value !== 0 && value !== false && !value || (value instanceof String && value && String(value).trim() === '') ) {
            return '-';
        }
        return value;
    }
}
