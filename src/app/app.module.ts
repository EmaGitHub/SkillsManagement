import { MatPaginatorI18nService } from './core/services/utils/mat-paginator-i18n.service';
import { BaseComponent } from './pages/base/base.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app.routing.module.';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
import { AppInitService } from './core/services/general-config/app-init.service';
import { SharedModule } from './shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { JwtInterceptor } from './core/http-utils/HttpInterceptor';
import { ErrorInterceptor } from './core/http-utils/ErrorInterceptor';
import { AccountModule } from './pages/account/account.module';
import { HomeComponent } from './pages/home/home.component';

// ngx-translate - required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HomeComponent,
    // *pages
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    // *app routing
    AppRoutingModule,
    // *app commons
    CoreModule,
    SharedModule,
    // **UTENTI
    AccountModule,
    // *ngx-translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      // returning an Observable and converting it to Promise. IMPORTANT it must be a Promise 
      provide: APP_INITIALIZER,
      useFactory: (appInitService: AppInitService) => () => appInitService.loadConfiguration().toPromise(),
      multi: true,
      deps: [AppInitService]
    },
    // http interceptor
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: MatPaginatorI18nService },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
