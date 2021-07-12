import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/app/pages/account/models/User';
import { JwtResponse } from 'src/app/shared/domain/auth/jwt-response';

@Injectable()
export class UserService {

    private currentUserSubject?: Subject<User>;
    public currentUser?: Observable<User>;

    constructor() { 
        let user = localStorage.getItem('currentUser');
        if (user != undefined) {
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user));
            this.currentUser = this.currentUserSubject.asObservable();
        }
    }

    public getCurrentUserAsObservable(): Observable<User> {
        if (this.currentUserSubject)
            return this.currentUserSubject;
        else {
            this.currentUserSubject = new Subject<User>();
            this.currentUser = this.currentUserSubject.asObservable();
            return this.currentUserSubject;
        }
    }

    public getUserSubject(): Subject<User> {
        return this.currentUserSubject;
    }

    public saveUserDataInLocalStorage(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }

    public getUser(): User {
        let user = {} as User;
        user = JSON.parse(localStorage.getItem('currentUser'));
        return user;
    }

    public getFullName(): string {
        let user = {} as User;
        user = JSON.parse(localStorage.getItem('currentUser'));

        if (user.firstName || user.lastName) {
            return `${user.firstName} ${user.lastName}`
        }
        return null;
    }

    public getUserId() {
        return localStorage.getItem('user-id');
    }


}
