import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../general-config/environment.service';
import { LeftMenuLink } from 'src/app/shared/domain/components/left-menu-link';
import { Lang } from 'src/app/shared/domain/enums/lang';

@Injectable({
    providedIn: 'root'
})
export class LeftMenuService {

    private _menuItemClickSubject$: Subject<LeftMenuLink> = new Subject<LeftMenuLink>();

    private _navigableMenuItemClickSubject$: Subject<LeftMenuLink> = new Subject<LeftMenuLink>();

    constructor(private environmentService: EnvironmentService, private httpClient: HttpClient) { }
    
    get menuItemClickSubjectAsObservable(): Observable<LeftMenuLink> {
        return this._menuItemClickSubject$.asObservable();
    }

    nextMenuItemClick(selectedLink: LeftMenuLink) {
        this._menuItemClickSubject$.next(selectedLink);
    }

    get navigableMenuItemClickSubjectAsObservable(): Observable<LeftMenuLink> {
        return this._navigableMenuItemClickSubject$.asObservable();
    }

    nextNavigableMenuItemClick(selectedLink: LeftMenuLink) {
        this._navigableMenuItemClickSubject$.next(selectedLink);
    }

    loadSidebarMenuItems(lang?: string): Observable<LeftMenuLink[]> {
        const _lang = lang && lang === Lang.EN ? Lang.EN : Lang.IT; 
        // return this.httpClient.get<LeftMenuLink[]>(url);
        return this.httpClient.get<LeftMenuLink[]>(`assets/config/sidebar-menu/items-${_lang}.json`);
    }

}