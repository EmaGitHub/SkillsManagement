import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/utils/authentication-service';
import { DialogService } from 'src/app/core/services/utils/dialog-service';
import { SpinnerService } from 'src/app/core/services/utils/spinner-service';
import { User } from '../../models/User';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  newUserForm = new FormGroup({
    username: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    firstName: new FormControl('', []),
    lastName: new FormControl('', [])
  }); 

  data: User = {
    username: '',
    firstName: '',
    lastName: ''
  };
  
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  constructor(private authService: AuthenticationService, private spinnerService: SpinnerService, private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  addUser() {

    if (this.newUserForm.valid) {
      this.spinnerService.start(""); 
      this.authService.register(this.data.firstName, this.data.lastName, this.data.username, "", false).subscribe(
        (resp: any) => {
          this.spinnerService.stop();
          let respString = JSON.stringify(resp);
          console.log("Registration response "+respString);                                     // if user creation is OK
          setTimeout(() => {
            this.dialogService.showTimedAlert(this.translateService.instant('message.success.userCreated'), 400);
          }, 0);
        },
        (err: any) => {
          this.spinnerService.stop();
          if (err.error.error && err.error.error === "DataIntegrityViolationException") {
            setTimeout(() => {
              this.dialogService.showTimedAlert(this.translateService.instant('message.error.usernameAlreadyPresent'), 1500);
            }, 0);
          } else {
            setTimeout(() => {
              this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
            }, 0);
          }
        }
      )
    }
  }


}
