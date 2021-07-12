import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeftMenuLink } from '../../domain/components/left-menu-link';
import { Subscription } from 'rxjs';
import { Lang } from '../../domain/enums/lang';
import { LanguageService } from 'src/app/core/services/general-config/language.service';
import { LeftMenuService } from 'src/app/core/services/utils/left-menu.service';
import { UserService } from 'src/app/core/services/utils/user.service';
import { User } from 'src/app/pages/account/models/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public user: User;

  public menuItems: LeftMenuLink[] = null;
  private menuItemsSubscription = null;

  private userLoggedSubscription: Subscription;
  private langSubscription: Subscription;
  private tokenSubscription: Subscription;

  constructor(private languageService: LanguageService, private leftMenuService: LeftMenuService,
             private userService: UserService) { }

  ngOnInit(): void {
    this.langSubscription = this.languageService.languageChangeAsObservable.subscribe(
      res => {
        const lang = res && res === Lang.EN ? Lang.EN : Lang.IT;
        this.loadMenuItems(lang);
      },
      err => {
        console.error(err);
      });

    this.user = this.userService.getUser();
  }

  private loadMenuItems(lang: string) {
    this.menuItemsSubscription = this.leftMenuService.loadSidebarMenuItems(lang).subscribe(
      res => {
        this.menuItems = res;
      },
      err => {
        console.error(err);
      });
  }

  ngOnDestroy() {
    if (this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
    if (this.menuItemsSubscription) {
      this.menuItemsSubscription.unsubscribe();
    }
  }

}
