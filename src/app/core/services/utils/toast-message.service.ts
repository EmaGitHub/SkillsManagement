import { Injectable } from "@angular/core";
import { Message } from 'primeng/api';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastMessageService {

    private _toastMessageSubject$: BehaviorSubject<any> = new BehaviorSubject<any>({ });

    constructor() { }

    get toastMessageSubjectAsObservable(): Observable<Message> {
        return this._toastMessageSubject$.asObservable();
    }

    public next(message: Message) {
        this._toastMessageSubject$.next(message);
    }

}
