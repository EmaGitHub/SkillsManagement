import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/utils/authentication-service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/pages/users/models/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private apiUrl = environment.apiUrl;

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUserString = localStorage.getItem('currentUser');
        let currentUser: User;
        if (currentUserString) {
            currentUser = JSON.parse(currentUserString);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        request = request.clone({
            setHeaders: {
                'Access-Control-Allow-Credentials': 'true'
            }
        });

        return next.handle(request);
    }
}