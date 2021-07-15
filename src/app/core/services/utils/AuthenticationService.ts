import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private userService: UserService, private route: Router) { }

    login(username: string, password: string) {
        let body = { 
            'username': username,
            'password': password
           };
        return this.http.post<any>("public/authenticate", body)
            /* .pipe(
                map(
                    (resp: JwtResponse) => {
                        // login successful if there's a jwt token in the response
                        if (resp && resp.token) {
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify(resp));
                            const user = {} as User;
                            user.username = resp.username;
                            user.token = resp.token;
                            this.userService.getUserSubject().next(user);
                        }
                        return resp;
                    },
                    catchError(err => {
                        console.log("Authentication error ",err)
                        return err;
                })
            )
        ) */
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
        console.log("Log out user")
        localStorage.removeItem('currentUser');
        this.route.navigate(['../login']);
    }
}