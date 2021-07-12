import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit {

  @Input() logoutSuccessed: boolean;

  constructor() { }

  ngOnInit(): void {  }

}
