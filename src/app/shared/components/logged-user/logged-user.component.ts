import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/utils/authentication-service';
import { UserService } from 'src/app/core/services/utils/user.service';
import { User } from 'src/app/pages/users/models/User';

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss']
})
export class LoggedUserComponent implements OnInit, OnDestroy {

  public dropdownVisible = false;
  public user: User;

  private userLoggedSubscription: Subscription;

  constructor(private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userLoggedSubscription = this.userService.getCurrentUserAsObservable().subscribe(
      (user: User) => {
          this.user = user;
      },
      (err: any) => {
        console.log("Error access to user ",err)
      });
  }

  public clickOutsideHandler() {
    this.dropdownVisible = false;
  }

  public toggleDropdownMenuHandler() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  public logout(event: any) {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
  }

}
