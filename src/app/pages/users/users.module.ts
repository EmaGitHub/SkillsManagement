import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpLoaderFactory, SharedModule } from "src/app/shared/shared.module";
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersService } from "./services/users.service";
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserCompetencesComponent } from './components/user-competences/user-competences.component';
import { AddCompetenceComponent } from './components/add-competence/add-competence.component';

@NgModule({
    declarations: [

    UsersListComponent,

    UserDetailsComponent,

    CreateUserComponent,

    UserInfoComponent,

    UserCompetencesComponent,

    AddCompetenceComponent],
    imports: [
        CommonModule,
        SharedModule,
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
        UsersService
    ]
})

export class UsersModule {}