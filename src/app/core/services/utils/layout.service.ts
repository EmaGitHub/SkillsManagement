import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    private _toggleSidebarSubject$: Subject<any> = new Subject<any>();

    get toggleSidebarSubjectAsObervable(): Observable<any> {
        return this._toggleSidebarSubject$.asObservable();
    }

    nextToggleSidebar(nextVal: any) {
        this._toggleSidebarSubject$.next(nextVal);
    }

}