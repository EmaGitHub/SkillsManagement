import { EmptyValuePipe } from './pipes/empty-value.pipe';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// primeng
import { MessageService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';

// material
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// ngx-translate
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// directives
import { ClickOutsideDirective } from './directives/click-outside.directive';

// pipes
import { NumTimePipe } from './pipes/num-time.pipe';
import { NumPipe } from './pipes/num.pipe';
import { DayTimePipe } from './pipes/day.pipe';
import { BoolPipe } from './pipes/bool.pipe';
import { PercentagePipe } from './pipes/percentage.pipe';

// components and modules
import { PaginatorComponent } from './components/paginator/paginator.component';
import { LangSwitcherComponent } from './components/lang-switcher/lang-switcher.component';
import { LeftMenuLinkComponent } from './components/left-menu-link/left-menu-link.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { ModalComponent } from './components/modal/modal.component';
import { NoDatePipe } from './pipes/no-date.pipe';
import { ExpiredSessionModalComponent } from './components/modal/expired-session-modal/expired-session-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggedUserComponent } from './components/logged-user/logged-user.component';
import { LogoutModalComponent } from './components/modal/logout-modal/logout-modal.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { StatusMessageComponent } from './components/status-message/status-message.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

// ngx-translate - AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const APP_CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    // *layout
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    // *layout util components
    LeftMenuLinkComponent,
    LangSwitcherComponent,
    // *directives
    ClickOutsideDirective,
    OnlyNumberDirective,
    // *pipes
    NumTimePipe,
    NumPipe,
    DayTimePipe,
    EmptyValuePipe,
    BoolPipe,
    NoDatePipe,
    PercentagePipe,
    // *components
    PaginatorComponent,
    ModalComponent,
    ExpiredSessionModalComponent,
    LogoutModalComponent,
    LoggedUserComponent,
    StatusMessageComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    // *http
    HttpClientModule,
    // *forms
    FormsModule,
    ReactiveFormsModule,
    // *ngx-translate
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    // *primeng
    OverlayPanelModule,
    DialogModule,
    TooltipModule,
    SidebarModule,
    // *material
    MatCardModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatFormFieldModule,
  ],
  exports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    // *layout
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    // *layout util components
    LeftMenuLinkComponent,
    LangSwitcherComponent,
    // *http
    HttpClientModule,
    // *forms
    FormsModule,
    ReactiveFormsModule,
    // *directives
    ClickOutsideDirective,
    OnlyNumberDirective,
    // *pipes
    NumTimePipe,
    NumPipe,
    DayTimePipe,
    EmptyValuePipe,
    BoolPipe,
    NoDatePipe,
    PercentagePipe,
    // *primeng
    OverlayPanelModule,
    DialogModule,
    TooltipModule,
    SidebarModule,
    // *material
    MatCardModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    // *components
    PaginatorComponent,
    ModalComponent,
    ExpiredSessionModalComponent,
    LogoutModalComponent,
    LoggedUserComponent,
    StatusMessageComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: APP_CUSTOM_DATE_FORMATS },
    { provide: MessageService, useClass: MessageService },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    // *pipes
    TranslatePipe,
    // *app pipes
    NumTimePipe,
    NumPipe,
    DayTimePipe,
    EmptyValuePipe,
    BoolPipe,
    PercentagePipe
  ],
  entryComponents: [
    // *directives
    ClickOutsideDirective
  ]
})
export class SharedModule { }
