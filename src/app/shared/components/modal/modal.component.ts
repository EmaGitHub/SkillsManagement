import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Event } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(400, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(400, style({opacity:0})) 
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {

  @Input() title: string = "Modal name";

  @Input() closable: boolean = true;

  display: boolean = false;
  contentLoaded: boolean = false;

  sideMenuSubject: Observable<any>;

  constructor() {}

  ngOnInit(): void { }

  close() {
    this.display = false;
  }

  toggle(event: Event) {
    if (!this.closable && this.display) {
      return;
    }
    this.display = !this.display;
  }

}
