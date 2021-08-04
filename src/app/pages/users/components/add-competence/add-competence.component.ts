import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DialogService } from 'src/app/core/services/utils/dialog-service';
import { SpinnerService } from 'src/app/core/services/utils/spinner-service';
import { Skill } from 'src/app/pages/skills/models/skill.model';
import { SkillsService } from 'src/app/pages/skills/services/skills.service';
import { Competence } from '../../models/Competence';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.scss']
})
export class AddCompetenceComponent implements OnInit {

  skills: Skill[];
  
  @Input() userId: number;
  skillValue: number = 0;
  maxValue: number = 5;

  formControl = new FormGroup({
    skillName: new FormControl('', [Validators.required]),
    skillMaxValue: new FormControl('', [Validators.required]),
    skillValue: new FormControl('', [])
  });
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter;

  constructor(private skillsService: SkillsService, private spinnerService: SpinnerService, private userService: UsersService, 
              private dialogService: DialogService, private translateService: TranslateService) { }
            
  ngOnInit() {
    this.filteredOptions = this.formControl.get('skillName').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.formControl.get('skillValue').valueChanges.subscribe(
      (value: any) => {
        this.formControl.get('skillMaxValue').updateValueAndValidity();
      }
    );
  }

  private _filter(value: string): string[] {
    console.log("TTT "+value)
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  loadData() {
    this.spinnerService.start();
    forkJoin([this.skillsService.getSkills()])
      .subscribe(([skills]: [Skill[]]) => {
          this.skills = skills;
          console.log("Response: Skills -> "+JSON.stringify(this.skills));
          this.options = this.skills.map(skill => skill.name);
          this.formControl.get('skillName').setValue("");
          this.spinnerService.stop();
      },
      (error: any) => {
        this.spinnerService.stop();
        console.log("Error response: "+JSON.stringify(error));
        if (error.status != 401)
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    );
  }

  formatLabel(value: number) {
    return value;
  }

  addUserCompetence() {
    if (this.formControl.valid) {
      if (this.maxValue < this.skillValue) {
        this.formControl.get('skillMaxValue').setErrors(Validators.min);
      } else {

        this.spinnerService.start();
        let skill: Skill = this.skills.filter(skill => skill.name == this.formControl.get('skillName').value)[0];
        if (skill != undefined) {
          let currentUser : User = JSON.parse(localStorage.getItem('currentUser'));
          const competence: Competence = {
            skillId: skill.id, 
            user: {
              id: this.userId
            }, 
            level: this.skillValue,
            maxLevel: this.maxValue,
            validationUserId: currentUser.id,
            validationDate: new Date()
          };
          this.userService.addUserSkill(competence).subscribe(
            (resp: any) => {
              console.log("Resp "+JSON.stringify(resp));
              this.spinnerService.stop();
              this.closeEvent.emit(null);
            },
            (err: any) => {
              console.log("Error: "+JSON.stringify(err));
              this.spinnerService.stop();
            }
          )
        }
        else
         this.formControl.get('skillName').setErrors(Validators.required);
      }
    } else 
      console.log("Form not valid");
  }
}
