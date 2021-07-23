import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/utils/DialogService';
import { SpinnerService } from 'src/app/core/services/utils/SpinnerService';
import { SkillArea } from '../../models/skill-area.model';
import { Skill } from '../../models/skill.model';
import { SkillsService } from '../../services/skills.service';

interface SkillAreaModel {
  key: number;
  value: string;
}

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.scss']
})
export class EditSkillsComponent implements OnInit {

  skill: string = "";
  newSkillArea: string = "";
  newSkillAreaVisible: boolean = false;

  //submitted: boolean = false;

  newSkillForm = new FormGroup({
    skill: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    skillArea: new FormControl('', [Validators.required, this.noSelectAreaValidator]),
    newSkillArea: new FormControl('', [])
  }); 

  data: Skill = {
    id: -1,
    competence: '',
    areaId: -1,
    newCompetenceArea: ''
  };

  skillAreas: SkillAreaModel[];

  selectedValue: number = 0;

  private skillAreaSubscription: Subscription;
  
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  noSelectAreaValidator(control: FormControl) {
    return control.value != -1 ? null : { 'selectArea': true};
  }

  constructor(private skillsService: SkillsService, private translateService: TranslateService, private spinnerService: SpinnerService, private dialogService: DialogService) {
    this.newSkillForm.get('skillArea').valueChanges
    .subscribe(value => {
      if (value == -1) {
        this.newSkillForm.get('skillArea').setErrors(Validators.required);
      }
      if (value == 0) {
        this.newSkillAreaVisible = true;
        this.newSkillForm.get('newSkillArea').setValidators(Validators.required)
        this.newSkillForm.get('newSkillArea').setValidators(this.noWhitespaceValidator)
      } else {
        this.newSkillAreaVisible = false;
        this.data.newCompetenceArea = '';
        this.newSkillForm.get('newSkillArea').clearValidators();
        this.newSkillForm.get('newSkillArea').updateValueAndValidity();
      }
    }
    );
  }

  ngOnInit(): void {
    //this.spinnerService.start();
    this.skillAreaSubscription = this.retrieveSkillAreas();
  }

  retrieveSkillAreas(): Subscription {
    this.skillAreas = [
      {key: -1, value: this.translateService.instant('label.selectSkillArea')},
      {key: 0, value: this.translateService.instant('label.newSkillArea')}
    ];
    return this.skillsService.getSkillAreas().subscribe(
      (resp: SkillArea[]) => {
        console.log("Received Skill Areas response: "+JSON.stringify(resp));

        for (let area of resp) {
          let a: SkillAreaModel = {'key': area.id, 'value': area.name};
          this.skillAreas.push(a);
        }      
        this.spinnerService.stop();
      },
      (err: any) => {
        console.log("Error "+JSON.stringify(err))
        this.spinnerService.stop();
        if (err.error.error && err.error.error === "DataIntegrityViolationException") {
          setTimeout(() => {
            this.dialogService.showTimedAlert(this.translateService.instant('message.error.areaAlreadyPresent'), 1500);
          }, 0);
        } else if (err.status != 401) {
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
        }
      }
    )
  }  

  addCompetence() {
    if (this.newSkillForm.valid) {
      // new Area check
      if (this.newSkillForm.get('skillArea').value == 0) {
      // skill with new Competence area
      this.spinnerService.start();
      this.skillsService.addSkillArea(this.data.newCompetenceArea).subscribe(
        (newSkillArea: any) =>  {
          let newSkill = {
            competence: this.data.competence,
            areaId: newSkillArea.id,
            newCompetenceArea: ''
          };
          console.log("New skill Area created ",JSON.stringify(newSkillArea)+" NS "+newSkill);
          this.skillsService.addSkill(newSkill).subscribe(
            (data: any) => {
              this.spinnerService.stop();
              this.dialogService.showTimedAlert(this.translateService.instant('message.success.competenceCreated'), 1000);
              this.retrieveSkillAreas();
              console.log("Skill creation success "+JSON.stringify(data))  
            },
            (err: any) => {
              this.spinnerService.stop();
              console.log("Response error: "+JSON.stringify(err))
              if (err.error.error && err.error.error === "DataIntegrityViolationException") {
                setTimeout(() => {
                  this.dialogService.showTimedAlert(this.translateService.instant('message.error.skillAlreadyPresent'), 1500);
                }, 0);
              } else if (err.status != 401)
                this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
            }
          ) 
        },
        (err: any) => {
          this.spinnerService.stop();
          console.log("Response error: "+JSON.stringify(err));
          if (err.error.error && err.error.error === "DataIntegrityViolationException") {
            setTimeout(() => {
              this.dialogService.showTimedAlert(this.translateService.instant('message.error.areaAlreadyPresent'), 1500);
            }, 0);
          } else if (err.status != 401)
            this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
        }
      )
    }
    // skill with old Competence area
      else {
        this.spinnerService.start();
        this.skillsService.addSkill(this.data).subscribe(
          (resp: any) => {
            this.spinnerService.stop();
            console.log("New Skill added ", resp);
            this.dialogService.showTimedAlert(this.translateService.instant('message.success.competenceCreated'), 1000);
            //this.newSkillForm.reset();
          },
          (err: any) => {
            this.spinnerService.stop();
            console.log("Error while adding Skill "+JSON.stringify(err));
            if (err.error.error && err.error.error === "DataIntegrityViolationException") {
              setTimeout(() => {
                this.dialogService.showTimedAlert(this.translateService.instant('message.error.skillAlreadyPresent'), 1500);
              }, 0);
            } else if (err.status != 401)
              this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
          }
        );
      }
    }
  }

  /* getFormValidationErrors() {
    Object.keys(this.newSkillForm.controls).forEach(key => {

    const controlErrors: ValidationErrors = this.newSkillForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    } */

  ngOnDestroy() {
    if (this.skillAreaSubscription)
      this.skillAreaSubscription.unsubscribe();
  }
  
}
