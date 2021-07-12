import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/pages/account/models/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject?: Subject<User>;
    public currentUser?: Observable<User>;
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
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
            //let user = localStorage.getItem('currentUser');
            this.currentUserSubject = new Subject<User>();
            this.currentUser = this.currentUserSubject.asObservable();
            return this.currentUserSubject;
        }
    }

    login(username: string, password: string) {
        let body = { 
            'username': username,
            'password': password
           };
        return this.http.post<any>("public/authenticate", body)
            .pipe(
                map(
                    resp => {
                        console.log("RESP ",resp)
                        // login successful if there's a jwt token in the response
                        if (resp && resp.token) {
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify(resp));
                            this.currentUserSubject?.next(resp);
                        }
                        return resp;
                    },
                    catchError(err => {
                        console.log("ERR ",err)
                        return err;
                })
            )
        )
    }

    register(firstName: string, lastName: string, username: string, password: string, systemAdmin: boolean) {
        let body = { 
            "firstName": firstName,
            "lastName": lastName,
            'username': username,
            'password': password,
            'isSystemAdmin': systemAdmin
           };
        return this.http.post<any>("public/register", body)
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}