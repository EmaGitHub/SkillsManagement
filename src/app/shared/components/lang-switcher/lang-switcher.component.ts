import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/services/general-config/language.service';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: './lang-switcher.component.html',
  styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent implements OnInit {

  dropdownVisible = false;

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
  }

  public clickOutsideHandler() {
    this.dropdownVisible = false;
  }

  public toggleDropdownMenuHandler() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  public changeLangHandler(lang: string) {
    this.dropdownVisible = false;
    this.languageService.changeLangHandler(lang);
  }

}
