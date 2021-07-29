import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BaseComponent } from './pages/base/base.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/account/components/login/login.component';
import { WelcomeComponent } from './pages/account/components/welcome/welcome.component';
import { SkillListComponent } from './pages/skills/components/skill-list/skill-list.component';
import { EditSkillsComponent } from './pages/skills/components/edit-skills/edit-skills.component';
import { SkillsTreeComponent } from './pages/skills/components/skills-tree/skills-tree.component';
import { UsersListComponent } from './pages/users/components/users-list/users-list.component';
import { UserDetailsComponent } from './pages/users/components/user-details/user-details.component';
import { CreateUserComponent } from './pages/users/components/create-user/create-user.component';

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
        path: '',
        component: BaseComponent,
        children: [
            {
                path: 'skills',
                children: [
                    {
                        path: '',
                        children: [
                            { path: '', redirectTo: 'home', pathMatch: 'full' },
                            { path: 'home', component: HomeComponent },
                            { path: 'edit', component: EditSkillsComponent },
                            { path: 'list', component: SkillListComponent },
                            { path: 'tree', component: SkillsTreeComponent }
                        ]
                    }
                ]
            },
            {
                path: 'users',
                children: [
                    {
                        path: '', 
                        children: [
                            { path: '', redirectTo: 'list', pathMatch: 'full' },
                            { path: 'create', component: CreateUserComponent },
                            { path: 'search', component: UsersListComponent },
                            { path: 'details/:id', component: UserDetailsComponent }
                        ]
                    }
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
