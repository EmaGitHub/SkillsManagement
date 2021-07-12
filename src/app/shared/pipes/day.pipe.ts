import { PipeTransform, Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../domain/enums/lang';
import * as moment from 'moment';

@Pipe({
    name: 'dayTime',
    pure: false
})
export class DayTimePipe implements PipeTransform {

    private ddmmyyyyDateRegExp = new RegExp('^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$');

    constructor(private translate: TranslateService) { }

    transform(value: string) {
        if (!value) {
            return '';
        }

        value = value.trim();

        const locale = this.translate.getDefaultLang() === Lang.EN ? Lang.EN : Lang.IT;
        moment.locale(locale);
     
        // dd-mm-yyyy
        if (this.ddmmyyyyDateRegExp.test(value)) {
            if (locale === Lang.IT) {
                return moment(value, 'DD-MM-YYYY').format('DD/MM/YYYY');
            }
            return moment(value, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }
        
        if (locale === Lang.IT) {
            return moment(value).format('DD/MM/YYYY');
        }
        return value;
    }

}
