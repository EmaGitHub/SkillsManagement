import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from './shared/domain/enums/lang';
import { Subscription } from 'rxjs';
import { SideMenuService } from './core/services/utils/side-menu.service';
import { LanguageService } from './core/services/general-config/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private refreshSubscription: Subscription;
  private languageSubscription: Subscription;

  public logoutSuccessed: boolean;

  constructor(private translate: TranslateService,
    private router: Router,
    private sideMenuService: SideMenuService,
    private languageService: LanguageService) {
    this.initTranslateDate();
    this.initDefaultLanguage();
    this.initRefreshSubscription();
    this.initLanguageSubscription();
  }

  ngOnInit() {  }

  private initDefaultLanguage() {
    let defaultLang = Lang.IT;

    let browserLang = window.navigator && window.navigator.language ? window.navigator.language : (navigator ? navigator.language : null);
    if (browserLang && browserLang === 'en') {
      defaultLang = Lang.EN;
    }
    console.log('init default language', defaultLang);

    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.languageService.nextLanguageChange(defaultLang);
  }

  private initRefreshSubscription() {
    this.refreshSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let browserRefresh = !this.router.navigated;
        if (browserRefresh) {
          let lastSidemenuLinkSelected = this.sideMenuService.getSidemenuLinkId();
          this.sideMenuService.pageChoose(lastSidemenuLinkSelected);
        }
      }
    });
  }

  private initLanguageSubscription() {
    this.languageSubscription = this.languageService.languageChangeAsObservable.subscribe(
      (data: any) => {
        let lastSidemenuLinkSelected = this.sideMenuService.getSidemenuLinkId();
        this.sideMenuService.pageChoose(lastSidemenuLinkSelected);
      }
    )
  }

  private initTranslateDate() {
    this.translate.addLangs([Lang.IT, Lang.EN]);
    this.translate.setDefaultLang(Lang.IT);
    this.translate.use(Lang.IT);
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
