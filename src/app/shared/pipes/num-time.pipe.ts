import { PipeTransform, Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
import { Lang } from '../domain/enums/lang';

@Pipe({
    name: 'numToDayPlusTime',
    pure: false
})
export class NumTimePipe implements PipeTransform {

    constructor(private translate: TranslateService) { }

    transform(value: string | number, format: string) {
        if (!value) {
            return '';
        }

        const locale = this.translate.getDefaultLang() === Lang.EN ? Lang.EN : Lang.IT;
        moment.locale(locale);

        if (format) {
            return moment(Number(value)).format(format);
        }
        return moment(Number(value)).format('DD MMM YY HH:mm:ss');
    }

}
