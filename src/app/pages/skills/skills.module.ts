import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpLoaderFactory, SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { EditSkillsComponent } from './components/edit-skills/edit-skills.component';
import { SkillsService } from './services/skills.service';

@NgModule({
  declarations: [
    // *pages
    SkillListComponent,
    EditSkillsComponent
],
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
      SkillsService
  ]
})
export class SkillsModule { }
