import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { concat, Observable, of, Subscription } from 'rxjs';
import { catchError, concatMap, mergeMap, switchMap } from 'rxjs/operators';
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
    this.spinnerService.start();
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
        if (err.status != 401)
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    )
  }
  
  /* addSkillArea(areaName: string) {
    this.skillsService.addSkillArea(areaName).subscribe(
      (resp: SkillArea) => {
        console.log("New Skill Area added ", resp);
        return resp;
      },
      (err: any) => {
        console.log("Error while adding Skill Area");
        this.spinnerService.stop();
        if (err.error.error && err.error.error === "DataIntegrityViolationException") {
          setTimeout(() => {
            this.dialogService.showTimedAlert(this.translateService.instant('message.error.skillAreaAlreadyPresent'), 1500);
          }, 0);
        } else if (err.status != 401)
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    );
  }

  addSkill(skill: Skill) {
    this.skillsService.addSkill(skill).subscribe(
      (resp: any) => {
        this.spinnerService.stop();
        console.log("New Skill Area added ", resp);
        this.dialogService.showTimedAlert(this.translateService.instant('message.success.competenceCreated'), 1000);
        //this.newSkillForm.reset();
      },
      (err: any) => {
        this.spinnerService.stop();
        console.log("Error while adding Skill");
        if (err.error.error && err.error.error === "DataIntegrityViolationException") {
          setTimeout(() => {
            this.dialogService.showTimedAlert(this.translateService.instant('message.error.skillAlreadyPresent'), 1500);
          }, 0);
        } else if (err.status != 401)
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    );
  } */
  

  addCompetence() {
    if (this.newSkillForm.valid) {
      if (this.newSkillForm.get('skillArea').value == 0) {
      // skill with new Competence area
      this.spinnerService.start();
      this.skillsService.addSkillArea(this.data.newCompetenceArea)
      .pipe(
        concatMap(
          newSkillArea => this.skillsService.addSkill(
            {
              competence: this.data.competence,
              areaId: newSkillArea.id,
              newCompetenceArea: ''
            }
          )
        ),
        //catchError(error => of(error))
      ).subscribe(
        success => { 
          this.spinnerService.stop();
          this.dialogService.showTimedAlert(this.translateService.instant('message.success.competenceCreated'), 1000);
          this.retrieveSkillAreas();
          console.log("SUCCESS "+JSON.stringify(success))  
        },
        errorData => { 
          this.spinnerService.stop();
          if (errorData.error.error && errorData.error.error === "DataIntegrityViolationException") {
            setTimeout(() => {
              this.dialogService.showTimedAlert(this.translateService.instant('message.error.skillOrAreaAlreadyPresent'), 1500);
            }, 0);
          } else if (errorData.status != 401)
            this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
          console.log("ERR "+JSON.stringify(errorData))
        }
      );
      
      }
      // skill with old Competence area
      else {
        this.spinnerService.start();
        this.skillsService.addSkill(this.data);
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
