import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-user-competences',
  templateUrl: './user-competences.component.html',
  styleUrls: ['./user-competences.component.scss']
})
export class UserCompetencesComponent implements OnInit {

  @ViewChild('competenceModal') competenceModal: ModalComponent;

  constructor() { }

  ngOnInit(): void {
  }

  competenceCreated(event: any) {
    this.competenceModal.toggle(null);
  }

}
