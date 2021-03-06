import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/utils/authentication-service';
import { DialogService } from '../services/utils/dialog-service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private dialogService: DialogService, private translateService: TranslateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 403) {
                // unauthorized request
                console.log("Forbidden request");
                this.dialogService.showTimedAlert(this.translateService.instant('message.warn.unauthorizedOperation'), 1500);
                setTimeout(() => {
                }, 1500);
            }
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                console.log("UnAuthorized request");
                this.dialogService.showTimedAlert(this.translateService.instant('message.warn.sessionExpired'), 1500);
                setTimeout(() => {
                    this.authenticationService.logout();
                }, 1500);
            }
            return throwError(err);
        }))
    }
}