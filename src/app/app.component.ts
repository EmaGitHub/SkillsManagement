import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from './shared/domain/enums/lang';
import { ModalComponent } from './shared/components/modal/modal.component';
import { Subscription } from 'rxjs';
import { SideMenuService } from './core/services/utils/side-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sessionExpiredModal') sessionExpiredModal: ModalComponent;

  @ViewChild('logoutModal') logoutModal: ModalComponent;

  private refreshSubscription: Subscription;
  private userSubscription: Subscription;

  public logoutSuccessed: boolean;

  constructor(private translate: TranslateService,
    private router: Router,
    private sideMenuService: SideMenuService) {
    this.initTranslateDate();
    this.initDefaultLanguage();
    this.initRefreshSubscription();
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
    //this.languageService.nextLanguageChange(defaultLang);
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

  private initTranslateDate() {
    this.translate.addLangs([Lang.IT, Lang.EN]);
    this.translate.setDefaultLang(Lang.IT);
    this.translate.use(Lang.IT);
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
