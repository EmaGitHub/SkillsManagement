import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/core/services/utils/spinner-service';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId: number;
  userInfo: Partial<User>;

  userDetailsSubscription: Subscription;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.start();
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUserData();
  }

  loadUserData() {
    this.userDetailsSubscription = this.usersService.getUserInfo(this.userId).subscribe(
      (info: any) => {
          console.log("User info "+JSON.stringify(info));
          this.userInfo = info;
          this.spinnerService.stop();
      },
      (err: any) => {
        console.log("Error retrieving user info: "+JSON.stringify(err));
        this.spinnerService.stop();
      }
    )
  }

  ngOnDestroy() {
    if (this.userDetailsSubscription)
      this.userDetailsSubscription.unsubscribe();
  }
  
}
