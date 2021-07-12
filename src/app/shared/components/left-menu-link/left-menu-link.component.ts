import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { LeftMenuLink } from '../../domain/components/left-menu-link';
import { Subscription } from 'rxjs';
import { LeftMenuService } from 'src/app/core/services/utils/left-menu.service';
import { SideMenuService } from 'src/app/core/services/utils/side-menu.service';

@Component({
  selector: 'app-left-menu-link',
  templateUrl: './left-menu-link.component.html',
  styleUrls: ['./left-menu-link.component.scss']
})
export class LeftMenuLinkComponent implements OnInit, OnDestroy {

  @Input('config') config: LeftMenuLink;

  userRoles: number[] = [1, 2];
  visibleToUser: boolean = false;

  open = false;
  closed = true;

  active = false;

  private pageChooseSubscription: Subscription;
  private menuItemClickSubscription: Subscription;
  private navigableMenuItemClickSubscription: Subscription;

  public subMenuMaxHeight: number = 0;
  @Output() heightChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private leftMenuService: LeftMenuService, private sidemenuService: SideMenuService) {   }

  ngOnInit(): void {
    this.pageChooseSubscription = this.sidemenuService.navigationTofirstPageSubjectAsObservable.subscribe(
      leftMenuLinkId => {

        let ancestorArray = this.sidemenuService.getSidemenuAncestorIds();

        // gestione apertura antenati non navigabili
        if (ancestorArray[0] == this.config.id) {

          // remove first elem
          ancestorArray.shift();
          this.sidemenuService.saveSidemenuLinkTreeInLocalStorage(ancestorArray);
          setTimeout(() => {
            this.toggle();
          }, 200);
        }

        // gestione selezione link navigabile
        if (leftMenuLinkId && this.config.id === leftMenuLinkId) {
          this.active = true;
          return;
        }
      },
      err => {
        console.error('error retrieving id after first page selection from welcome page', err);
      }
    );

    this.menuItemClickSubscription = this.leftMenuService.menuItemClickSubjectAsObservable.subscribe(
      (selectedLink: LeftMenuLink) => {

        //chiusura di link non selezionato livello 1
        if(this.config.level === 1 && selectedLink.level === 1 && this.config.label !== selectedLink.label)
          if(this.open) this.toggle();
        
        // chiusura di link non selezionato su livello 2
        if (this.config.level === 2 && selectedLink.level === 2 && selectedLink.label !== this.config.label) 
          if (this.open) this.toggle();

        // chiusura tutti link figli se premuto link livello 1
        if(this.config.level === 2 && selectedLink.level === 1) {
          if (this.open){
            this.open = false;
            this.closed = true;
            this.subMenuMaxHeight = 0;
          }
        }
      },
      err => {
        console.error(err);
      }
    );

    this.navigableMenuItemClickSubscription = this.leftMenuService.navigableMenuItemClickSubjectAsObservable.subscribe(
      (selectedLink: LeftMenuLink) => {

        if (selectedLink.label === this.config.label && selectedLink.isNavigable == true) {
          this.active = true;
        } else {
          this.active = false;
          if (!this.isSelectedLinkChild(selectedLink) && selectedLink.isNavigable == false) {
            this.open = false;
            this.closed = true;
          }
        }
      },
      err => {
        console.error(err);
      }
    );

    this.checkUserRole();
  }

  checkUserRole() {
    for (var role of this.config.roles) {
      if (this.userRoles.includes(role))
        this.visibleToUser = true;
    }
  }

  openSubMenuHandler() {
    this.leftMenuService.nextMenuItemClick(this.config);
    this.toggle();
  }

  toggle(){
    switch(this.open){
      case false: {
        this.open = true;
        this.closed = false;
        this.openLink();
        break;
      }
      case true: {
        this.open = false;
        this.closed = true;
        this.closeLink();
        break;
      }
    }
  }

  openLink(){
    if(this.config.level == 1) {
      this.subMenuMaxHeight += (46 * this.config.children.length); 
    }
          
    if(this.config.level == 2) {
      this.heightChanged(40 * this.config.children.length); 
      this.subMenuMaxHeight += 40 * this.config.children.length;
    }
  }

  closeLink(){
    if(this.config.level == 1) {
      this.subMenuMaxHeight = 0;
    }

    if(this.config.level == 2) {
      this.heightChanged(-40 * this.config.children.length);
      this.subMenuMaxHeight = 0;
    }
  }

  heightChanged(value: number) {
      this.heightChange.emit(value);
  }

  changeHeight(value: number) {
    this.subMenuMaxHeight += value;
  }

  activeMenuItemHandler() {
    this.leftMenuService.nextNavigableMenuItemClick(this.config);
    this.sidemenuService.saveSidemenuLinkIdInLocalStorage(this.config.id);
    console.log("sidemenu navigable item clicked "+JSON.stringify(this.config.id));
  }

  getLevelCssClass() {
    return 'level' + this.config.level;
  }

  private isSelectedLinkChild(selectedLink: LeftMenuLink) {
    if (this.config.children) {
      for (let child1 of this.config.children) {
        if (child1.label === selectedLink.label) {
          return true;
        }
        if (child1.children) {
          for (let child2 of child1.children) {
            if (child2.label === selectedLink.label) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  public getIconClass(): string {
    return this.config.icon ? `fa fa-${this.config.icon}` : 'fa fa-dot-circle-o';
  }

  ngOnDestroy() {
    if (this.pageChooseSubscription) {
      this.pageChooseSubscription.unsubscribe();
    }
    if (this.menuItemClickSubscription) {
      this.menuItemClickSubscription.unsubscribe();
    }
    if (this.navigableMenuItemClickSubscription) {
      this.navigableMenuItemClickSubscription.unsubscribe();
    }
  }

}
