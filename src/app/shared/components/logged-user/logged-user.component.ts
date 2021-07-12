import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/utils/user.service';
import { UtilService } from 'src/app/core/services/utils/util.service';
import { User } from 'src/app/pages/account/models/User';

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss']
})
export class LoggedUserComponent implements OnInit, OnDestroy {

  public dropdownVisible = false;

  public user: User;

  private userLoggedSubscription: Subscription;

  constructor(private userService: UserService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  public clickOutsideHandler() {
    this.dropdownVisible = false;
  }

  public toggleDropdownMenuHandler() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  public logout(event: any) {
    this.utilService.logout();
  }

  ngOnDestroy(): void {
    if (this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
  }

}
