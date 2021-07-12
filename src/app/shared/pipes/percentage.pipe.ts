import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'percentage',
    pure: false
})
export class PercentagePipe implements PipeTransform {

    constructor() { }

    transform(value: number) {
        if (value) {
            return value * 100;
        }
        else {
            return null;
        }
    }
}