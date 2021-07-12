import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/app/shared/domain/utils/environment.model';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {

    private _environment: Environment;

    constructor() { }
    
    setEnvironment(environment: Observable<Environment>) {
        environment.subscribe(data => this._environment = { ...data });
    }

    get environment() {
        return this._environment;
    }

}
