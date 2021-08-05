import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/utils/dialog-service';
import { SpinnerService } from 'src/app/core/services/utils/spinner-service';
import { Competence } from '../../models/Competence';
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
  userSkills: Competence[];

  constructor(private usersService: UsersService, private route: ActivatedRoute, private spinnerService: SpinnerService,
                private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.spinnerService.start();
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    forkJoin([this.usersService.getUserInfo(this.userId), this.usersService.getUserCompetences(this.userId)])
      .subscribe(([info, skills]: [Partial<User>, Competence[]]) => {
          this.userInfo = info;
          this.userSkills = skills;
          this.spinnerService.stop();
          console.log("Response: info -> "+JSON.stringify(this.userInfo)+" User Skills -> "+JSON.stringify(this.userSkills));
      },
      (error: any) => {
        this.spinnerService.stop();
        console.log("Error response: "+JSON.stringify(error));
        if (error.status != 401)
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    );
  }

  ngOnDestroy() {}
  
}
