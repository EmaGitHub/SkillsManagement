import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/utils/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.layoutService.nextToggleSidebar(null);
  }

}
