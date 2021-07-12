import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/AuthenticationService';
import { DialogService } from 'src/app/core/services/DialogService';
import { SpinnerService } from 'src/app/core/services/SpinnerService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  username: string; 
  password: string;
  systemAdmin: boolean = false;

  @Output('selectedTabIndex') 
  selectedTabIndex: EventEmitter<number> = new EventEmitter<number>();

  constructor(private spinnerService: SpinnerService, private authService: AuthenticationService, private translateService: TranslateService, private dialogService: DialogService) { }

  ngOnInit(): void {
  }
  
  register() {
    this.spinnerService.start(""); 
    this.authService.register(this.firstName, this.lastName, this.username, this.password, this.systemAdmin).subscribe(
      (resp: any) => {
        this.spinnerService.stop();
        let respString = JSON.stringify(resp);
        console.log("Registration response "+respString);
        if (resp.error && resp.error === "DataIntegrityViolationException") {
          setTimeout(() => {
            this.dialogService.showTimedAlert("Username already taken", 1500);
          }, 0);
        }
        else {                                       // if user creation is OK
          this.selectedTabIndex.emit(0);
          setTimeout(() => {
            this.dialogService.showTimedAlert(this.translateService.instant('message.success.userCreated'), 500);
          }, 0);
        }
      },
      (err: any) => {
        this.spinnerService.stop();
        console.log("Error "+JSON.stringify(err));
        setTimeout(() => {
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
        }, 0);
      }
    )
  }

  goLogin() {
    this.selectedTabIndex.emit(0);
  }


}
