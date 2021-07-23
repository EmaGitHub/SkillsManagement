import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpLoaderFactory, SharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SkillListComponent } from './components/skill-list/skill-list.component';
import { EditSkillsComponent } from './components/edit-skills/edit-skills.component';
import { SkillsService } from './services/skills.service';
import { SkillItemComponent } from './components/skill-item/skill-item.component';
import { SkillsTreeComponent } from './components/skills-tree/skills-tree.component';
import { AddAreaComponent } from './components/add-area/add-area.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';

@NgModule({
  declarations: [
    // *pages
    SkillListComponent,
    EditSkillsComponent,
    SkillItemComponent,
    SkillsTreeComponent,
    AddAreaComponent,
    AddSkillComponent
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
