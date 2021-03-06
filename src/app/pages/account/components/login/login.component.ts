import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/utils/authentication-service';
import { DialogService } from 'src/app/core/services/utils/dialog-service';
import { SideMenuService } from 'src/app/core/services/utils/side-menu.service';
import { SpinnerService } from 'src/app/core/services/utils/spinner-service';
import { UserService } from 'src/app/core/services/utils/user.service';
import { JwtResponse } from 'src/app/shared/domain/auth/jwt-response';
import { User } from '../../../users/models/User';

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

  loginSubscription: Subscription;

  constructor(private router: Router, private spinnerService: SpinnerService, private translateService: TranslateService, private sideMenuService: SideMenuService,
              private authService: AuthenticationService, private dialogService: DialogService, private userService: UserService) { }

  ngOnInit(): void {
  }
  
  login() {
    this.spinnerService.start(""); 
    this.loginSubscription = this.authService.login(this.username, this.password).subscribe(
      (resp: JwtResponse) => {
        this.spinnerService.stop();
        setTimeout(() => {
          this.dialogService.showTimedAlert(this.translateService.instant('message.success.loginSucceeded'), 900);
        }, 0);
        console.log("Login succeeded "+JSON.stringify(resp));
        this.sideMenuService.pageChoose("home");
        if (resp && resp.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(resp));
          const user = {} as User;
          user.username = resp.username;
          user.token = resp.token;
          this.userService.getUserSubject().next(user);
          this.router.navigate(['./skills/home']);
      }
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

  ngOnDestroy() {
    if (this.loginSubscription)
      this.loginSubscription.unsubscribe();
  }

}
