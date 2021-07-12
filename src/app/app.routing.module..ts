import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BaseComponent } from './pages/base/base.component';
import { WelcomeComponent } from './pages/account/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/account/login/login.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', redirectTo: 'login', pathMatch: 'full' },
                    { path: 'login', component: LoginComponent }
                ]
            }
        ]
    },
    {
        path: 'skills',
        component: BaseComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'home', component: HomeComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top'
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
