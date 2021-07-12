import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/AuthenticationService';
import { DialogService } from 'src/app/core/services/DialogService';
import { LanguageService } from 'src/app/core/services/general-config/language.service';
import { SpinnerService } from 'src/app/core/services/SpinnerService';
import { JwtResponse } from 'src/app/shared/domain/auth/jwt-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string; 

  @Output('selectedTabIndex') 
  selectedTabIndex: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router, private spinnerService: SpinnerService, private translateService: TranslateService,
              private authService: AuthenticationService, private dialogService: DialogService) { }

  ngOnInit(): void {
  }
  
  login() {
    this.spinnerService.start(""); 
    this.authService.login(this.username, this.password).subscribe(
      (resp: JwtResponse) => {
        this.spinnerService.stop();
        setTimeout(() => {
          this.dialogService.showTimedAlert(this.translateService.instant('message.success.loginSucceeded'), 500);
        }, 0);
        console.log("Login succeeded "+JSON.stringify(resp));
        this.router.navigate(['./home']);
      },
      (err: JwtResponse) => {
        this.spinnerService.stop();
        console.log("Error "+JSON.stringify(err));
        if (err.status === 401)
          setTimeout(() => {
            this.dialogService.showTimedAlert(this.translateService.instant('message.error.wrongCredentials'), 1500);
          }, 0);
        else 
          setTimeout(() => {
            this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
          }, 0);
      }
    )
  }

  goRegister() {
    this.selectedTabIndex.emit(1);
  }

}
