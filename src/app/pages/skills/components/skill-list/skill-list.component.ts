import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/general-config/language.service';
import { DialogService } from 'src/app/core/services/utils/DialogService';
import { SpinnerService } from 'src/app/core/services/utils/SpinnerService';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  skills: any[];

  constructor(private skillsService: SkillsService, private spinnerService: SpinnerService, private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.spinnerService.start();
    this.skillsService.getSkills().subscribe(
      (resp: any) => {
        console.log("Received response "+JSON.stringify(resp));
        this.skills = resp;
        this.spinnerService.stop();
      },
      (err: any) => {
        console.log("Error "+JSON.stringify(err))
        this.spinnerService.stop();
        this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    )
  }

}
