import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/app/core/services/utils/DialogService';
import { SkillArea } from '../../models/skill-area.model';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent implements OnInit {

  @Output() closeEvent: EventEmitter<any> = new EventEmitter;

  areaName: string = '';

  @Input() parentAreaId: number;
  
  areaForm = new FormGroup({
    areaName: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
  }); 

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  constructor(private skillsService: SkillsService, private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  addArea() {
    if (this.areaForm.valid) {
      console.log("Creation area ");
      let skillArea: SkillArea = {
        name: this.areaName,
        parentId: this.parentAreaId
      }
      this.skillsService.addArea(skillArea).subscribe(
        (area: SkillArea) => {
          console.log("Area created "+JSON.stringify(area));
          this.resetForm();
          this.closeEvent.emit(area);
          this.dialogService.showTimedAlert(this.translateService.instant('message.success.competenceAreaCreated'), 1000);
        },
        (err: any) => {
          console.log("Response error: "+JSON.stringify(err))
          if (err.error.error && err.error.error === "DataIntegrityViolationException") {
            setTimeout(() => {
              this.dialogService.showTimedAlert(this.translateService.instant('message.error.areaAlreadyPresent'), 1500);
            }, 0);
          } else if (err.status != 401)
            this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
          this.resetForm();
          this.closeEvent.emit(err);
        });
      }
  }

  resetForm() {
    setTimeout(() => {
      this.areaForm.reset();
      this.areaForm.markAsPristine();
      this.areaForm.markAsUntouched();
      this.areaForm.updateValueAndValidity();
    }, 500);
  }

}