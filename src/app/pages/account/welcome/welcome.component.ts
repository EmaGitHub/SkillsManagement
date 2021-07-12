import { Subscription } from 'rxjs';
import { SideMenuService } from '../../../core/services/utils/side-menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/utils/user.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { LanguageService } from 'src/app/core/services/general-config/language.service';
import { Lang } from 'src/app/shared/domain/enums/lang';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  public displayWelcomeScreen: boolean = true;
  public selectedLanguage: string = 'it';

  tabSelectedIndex: number = 0;

  username: string = '';
  password: string = '';

  private langSubscription: Subscription;

  constructor(private userService: UserService, private sideMenuService: SideMenuService, private languageService: LanguageService) { }

  ngOnInit(): void {

    this.langSubscription = this.languageService.languageChangeAsObservable.subscribe(
      res => {
        this.selectedLanguage = res && res === Lang.EN ? Lang.EN : Lang.IT;
      },
      err => {
        console.error(err);
      });

  }

  public changeLangHandler(langToggleChange: MatButtonToggleChange) {
    if (langToggleChange) {
      this.languageService.changeLangHandler(langToggleChange.value);
      return;
    }
    console.error('no value selected for app language', langToggleChange);
  }

  changeTabSelectedIndex(index: number) {
    this.tabSelectedIndex = index;
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

}
