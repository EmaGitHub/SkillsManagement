import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lang } from 'src/app/shared/domain/enums/lang';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    private languageChangeSubject$: Subject<any> = new Subject<any>();

    constructor(private translate: TranslateService, private dateAdapter: DateAdapter<any>) { }

    get languageChangeAsObservable(): Observable<Lang> {
        return this.languageChangeSubject$.asObservable();
    }

    public nextLanguageChange(lang: Lang) {
        this.languageChangeSubject$.next(lang);
    }

    public changeLangHandler(lang: string) {
        const _lang = lang && lang === Lang.EN ? lang : Lang.IT;
    
        // init language for ngx-translate
        this.translate.setDefaultLang(_lang);
        this.translate.use(_lang);
    
        // sidebar menu refresh and emit language change by subject
        // this.initSidebarMenu(_lang);
        this.languageChangeSubject$.next(_lang);
    
        // swtch date format (for date picker)
        this.dateAdapter.setLocale(_lang);
      }

}