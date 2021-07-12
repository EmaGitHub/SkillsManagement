import { Injectable } from '@angular/core';
import { User } from 'src/app/pages/account/models/User';

@Injectable()
export class UserService {

    constructor() { }

    public saveUserDataInLocalStorage(user: User) {
        localStorage.setItem('user-first-name', user.firstName);
        localStorage.setItem('user-last-name', user.lastName);
        localStorage.setItem('user-id', String(user.userId));
        return true;
    }

    public getUser(): User {
        const user = {} as User;
        user.firstName = localStorage.getItem('user-first-name');
        user.lastName = localStorage.getItem('user-last-name');
        user.userId = Number(localStorage.getItem('user-id'));
        return user;
    }

    public getFullName(): string {
        const first: string = localStorage.getItem('user-first-name');
        const last: string = localStorage.getItem('user-last-name');
        if (first || last) {
            return `${first} ${last}`
        }
        return null;
    }

    public getUserId() {
        return localStorage.getItem('user-id');
    }

    public getCompanyName(): string {
        return localStorage.getItem('company-name');
    }

    public getBusinessName(): string {
        return localStorage.getItem('business-name');
    }

}
