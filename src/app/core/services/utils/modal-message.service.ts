import { Injectable } from "@angular/core";
import { Message } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalMessageService {

    private _modalMessageSubject$: Subject<any> = new Subject<any>();

    constructor() { }

    get modalMessageSubjectAsObservable(): Observable<Message> {
        return this._modalMessageSubject$.asObservable();
    }

    public showSessionExpired() {
        this._modalMessageSubject$.next();
    }

}
