import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    private config$: Observable<any>;

    constructor(private environmentService: EnvironmentService) { }

    loadConfiguration() {
        console.log('load config from environment', environment);
        this.config$ = of(environment);
        this.environmentService.setEnvironment(this.config$);
        return this.config$;
    }

}
