import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.scss']
})
export class StatusMessageComponent implements OnInit {

  @Input() message = 'message.warn.noDataFound';
  
  level: string = 'warn';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.message.startsWith("message.warn"))
      this.level = "warn";
    else
      this.level = "err";
  }

  refresh() {
    window.location.reload();  
  }

}
