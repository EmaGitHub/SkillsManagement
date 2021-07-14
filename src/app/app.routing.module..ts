import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BaseComponent } from './pages/base/base.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/account/components/login/login.component';
import { WelcomeComponent } from './pages/account/components/welcome/welcome.component';
import { SkillListComponent } from './pages/skills/components/skill-list/skill-list.component';
import { EditSkillsComponent } from './pages/skills/components/edit-skills/edit-skills.component';

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
                    { path: 'home', component: HomeComponent },
                    { path: 'edit', component: EditSkillsComponent },
                    { path: 'list', component: SkillListComponent }
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
