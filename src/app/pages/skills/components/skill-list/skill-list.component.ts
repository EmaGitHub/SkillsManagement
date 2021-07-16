import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/utils/DialogService';
import { SpinnerService } from 'src/app/core/services/utils/SpinnerService';
import { SkillArea } from '../../models/skill-area.model';
import { Skill } from '../../models/skill.model';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  apiResponse: number = 0;
  skills: Skill[];
  skillAreas: SkillArea[];

  skillsSubscription: Subscription;
  skillAreasSubscription: Subscription;

  constructor(private skillsService: SkillsService, private spinnerService: SpinnerService, private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.spinnerService.start();
    this.skillsSubscription = this.skillsService.getSkills().subscribe(
      (resp: any) => {
        console.log("Received Skills "+JSON.stringify(resp));
        this.apiResponse += 1;
        this.skills = resp;
        if (this.apiResponse == 2)
          this.spinnerService.stop();
      },
      (err: any) => {
        console.log("Error "+JSON.stringify(err))
        this.spinnerService.stop();
        if (err.status != 401)
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    );

    this.skillAreasSubscription = this.skillsService.getSkillAreas().subscribe(
      (resp: any) => {
        console.log("Received SkillAreas "+JSON.stringify(resp));
        this.apiResponse += 1;
        this.skillAreas = resp;
        if (this.apiResponse == 2)
          this.spinnerService.stop();
      },
      (err: any) => {
        console.log("Error "+JSON.stringify(err))
        this.spinnerService.stop();
        if (err.status != 401)
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    );
  }

  ngOnDestroy() {
    if (this.skillsSubscription)
      this.skillsSubscription.unsubscribe();
    if (this.skillAreasSubscription)
      this.skillAreasSubscription.unsubscribe();
  }

}
