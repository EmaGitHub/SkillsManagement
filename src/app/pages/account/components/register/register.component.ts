import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/utils/AuthenticationService';
import { DialogService } from 'src/app/core/services/utils/DialogService';
import { SpinnerService } from 'src/app/core/services/utils/SpinnerService';

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

  registerSubscription: Subscription;

  constructor(private spinnerService: SpinnerService, private authService: AuthenticationService, private translateService: TranslateService, private dialogService: DialogService) { }

  ngOnInit(): void {
  }
  
  register() {
    this.spinnerService.start(""); 
    this.registerSubscription = this.authService.register(this.firstName, this.lastName, this.username, this.password, this.systemAdmin).subscribe(
      (resp: any) => {
        this.spinnerService.stop();
        let respString = JSON.stringify(resp);
        console.log("Registration response "+respString);                                     // if user creation is OK
        this.selectedTabIndex.emit(0);
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

  goLogin() {
    this.selectedTabIndex.emit(0);
  }

  ngOnDestroy() {
    if (this.registerSubscription)
      this.registerSubscription.unsubscribe();
  }

}
