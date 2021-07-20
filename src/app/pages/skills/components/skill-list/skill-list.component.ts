import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { DialogService } from 'src/app/core/services/utils/DialogService';
import { SpinnerService } from 'src/app/core/services/utils/SpinnerService';
import { SkillArea } from '../../models/skill-area.model';
import { Skill } from '../../models/skill.model';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {

  apiResponse: number = 0;
  skills: Skill[];
  skillAreas: SkillArea[];

  constructor(private skillsService: SkillsService, private spinnerService: SpinnerService, private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.spinnerService.start();
    forkJoin([this.skillsService.getSkills(), this.skillsService.getSkillAreas()])
      .subscribe(([skills, areas]: [Skill[], SkillArea[]]) => {
          this.skills = skills;
          this.skillAreas = areas
          console.log("Response: Skills -> "+JSON.stringify(this.skills)+" Areas -> "+JSON.stringify(this.skillAreas));
          this.spinnerService.stop();
      },
      (error: any) => {
        this.spinnerService.stop();
        console.log("Error response: "+error);
        if (error.status != 401)
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    );
  }

  deleteArea(areaId: number) {
    this.dialogService.showConfirmAlert(this.translateService.instant('message.warn.deleteSkillArea'), this.translateService.instant('message.warn.confirmDeleteSkillArea'), 
                                                this.translateService.instant('message.success.yes'), "No", () => {
      this.spinnerService.start();
      this.skillsService.deleteSkillArea(areaId).subscribe(
        (resp: any) => {
          this.skillAreas = this.skillAreas.filter(e => e.id !== areaId)
          console.log("Skill area deleted "+JSON.stringify(resp));
          this.spinnerService.stop();
        },
        (error: any) => {
          console.log("Err "+JSON.stringify(error));
          this.spinnerService.stop();
        }
      );
    });
  }

  deleteSkill(skillId: number) {
    this.dialogService.showConfirmAlert(this.translateService.instant('message.warn.deleteSkill'), this.translateService.instant('message.warn.confirmDeleteSkill'), 
                                                this.translateService.instant('message.success.yes'), "No", () => {
      this.spinnerService.start();
      this.skillsService.deleteSkill(skillId).subscribe(
        (resp: any) => {
          this.skills = this.skills.filter(e => e.id !== skillId)
          console.log("Skill deleted "+JSON.stringify(resp));
          this.spinnerService.stop();
        },
        (error: any) => {
          console.log("Err "+JSON.stringify(error));
          this.spinnerService.stop();
        }
      );
    });
  }

  filteredList(areaId: number): Skill[] {
    return this.skills.filter(
      skill => skill.areaId === areaId);
  }

  ngOnDestroy() {
  }

}
