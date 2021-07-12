import { retryWhen, catchError, concatMap, delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HttpClientService {

    private requestAttempt: number = 0;
    private requestsLimit: number = 3;
    private errorResponse: HttpErrorResponse; 

    constructor(private httpClient: HttpClient){}

    public getWithRetry<T>(url: any, requestsLimit?: number): Observable<any>{
        this.requestsLimit = requestsLimit;
        return this.httpClient.get(url).pipe(
            retryWhen((errors: Observable<any>) => {
                this.requestAttempt = 0;
                return errors.pipe(
                    concatMap((error: any) => {
                        this.errorResponse = error;
                        if (this.requestAttempt < this.requestsLimit && error.status >= 500) {
                            console.log("Internal server error 500 ",error)
                            this.requestAttempt++;
                            return of(error.status).pipe(delay(1000)) ;
                        }
                        else if (error.status == 404) {
                            console.log("error 404 not found")
                        }
                        return throwError(this.errorResponse);
                    })
                );
            }),
            catchError(() => {
                console.log("Maximum number of attempts reached");
                return throwError(this.errorResponse);
            })
        );
    }
}