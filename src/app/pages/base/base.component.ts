import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/core/services/utils/layout.service';
import { LeftMenuService } from 'src/app/core/services/utils/left-menu.service';
import { LeftMenuLink } from 'src/app/shared/domain/components/left-menu-link';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {

  SCREEN_WIDTH_767 = 767;

  @ViewChild('sidebar')
  sidebarRef: ElementRef;

  bigScreenSidebarCollapsed = false;
  littleScreenSidebarExpanded = false;

  private toggleSidebarSubscription: Subscription;
  private navigableMenuItemClickSubscription: Subscription;

  constructor(private layoutService: LayoutService, private leftMenuService: LeftMenuService) { }

  ngOnInit() {
    this.toggleSidebarSubscription = this.layoutService.toggleSidebarSubjectAsObervable.subscribe(
      res => {
        if (window.innerWidth < this.SCREEN_WIDTH_767) {
          this.littleScreenSidebarExpanded = true;
        } else {
          this.bigScreenSidebarCollapsed = !this.bigScreenSidebarCollapsed;
        }
      },
      err => {
        console.error(err);
      }
    );

    this.navigableMenuItemClickSubscription = this.leftMenuService.navigableMenuItemClickSubjectAsObservable.subscribe(
      (selectedLink: LeftMenuLink) => {
        if (window.innerWidth < this.SCREEN_WIDTH_767) {
          this.littleScreenSidebarExpanded = false;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  clickOnSidebarOverlayHandler() {
    this.littleScreenSidebarExpanded = false;
  }

  ngOnDestroy() {
    if (this.toggleSidebarSubscription) {
      this.toggleSidebarSubscription.unsubscribe();
    }
    if (this.navigableMenuItemClickSubscription) {
      this.navigableMenuItemClickSubscription.unsubscribe();
    }
  }

}
