import { PipeTransform, Pipe } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../domain/enums/lang';
import { max } from 'moment';

@Pipe({
    name: 'floatingFormat',
    pure: false
})
export class NumPipe implements PipeTransform {

    private numWithDotRegExp = /^-?\d*\.?\d*$/;
    private numWithCommaRegExp = /^-?\d*\,?\d*$/;

    constructor(private translate: TranslateService) { }

    transform(value: string | number, minimumFractionDigits?: number, maximumFractionDigits?: number) {
        if (!value && value !== 0) {
            return '';
        }

        if (typeof value === 'string') {
            if (this.numWithDotRegExp.test(value)) {
                return this.formatNum(Number(value), minimumFractionDigits, maximumFractionDigits);
            }
            if (this.numWithCommaRegExp.test(value)) {
                value = value.replace(',', '.');
                return this.formatNum(Number(value), minimumFractionDigits, maximumFractionDigits);
            }
            return value;
        }

        return this.formatNum(Number(value), minimumFractionDigits);
    }

    private formatNum(value: number, minimumFractionDigits?: number, maximumFractionDigits?: number) {
        const locale = this.translate.getDefaultLang() === Lang.EN ? Lang.EN : Lang.IT;
        if (minimumFractionDigits) {
            if (!maximumFractionDigits || minimumFractionDigits > maximumFractionDigits) {
                maximumFractionDigits = minimumFractionDigits;
            }
            return Number(value).toLocaleString(locale, { minimumFractionDigits, maximumFractionDigits });
        }
        return Number(value).toLocaleString(locale);
    }

}
