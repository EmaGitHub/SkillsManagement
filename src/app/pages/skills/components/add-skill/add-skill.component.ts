import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/app/core/services/utils/DialogService';
import { SkillArea } from '../../models/skill-area.model';
import { Skill } from '../../models/skill.model';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {

  @Output() closeEvent: EventEmitter<any> = new EventEmitter;

  skillName: string = '';

  @Input() parentAreaId: number;
  
  skillForm = new FormGroup({
    skillName: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
  }); 

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  constructor(private skillsService: SkillsService, private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  addSkill(formDirective: FormGroupDirective) {
    if (this.skillForm.valid) {
      console.log("Creation skill");
      let skill: Skill = {
        competence: this.skillName,
        areaId: this.parentAreaId
      }
      this.skillsService.addSkill(skill).subscribe(
        (skill: any) => {
          console.log("Area created");
          this.resetForm(formDirective);
          this.closeEvent.emit(skill);
          this.dialogService.showTimedAlert(this.translateService.instant('message.success.competenceCreated'), 1000);
        },
        (err: any) => {
          console.log("Response error: "+JSON.stringify(err))
          if (err.error.error && err.error.error === "DataIntegrityViolationException") {
            setTimeout(() => {
              this.dialogService.showTimedAlert(this.translateService.instant('message.error.skillAlreadyPresent'), 1500);
            }, 0);
          } else if (err.status != 401)
            this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
          this.resetForm(formDirective);
          this.closeEvent.emit(err);
        });
      }
  }

  resetForm(formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.skillForm.reset();
  }

}
