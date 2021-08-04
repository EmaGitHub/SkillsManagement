import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/app/core/services/utils/dialog-service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-user-competences',
  templateUrl: './user-competences.component.html',
  styleUrls: ['./user-competences.component.scss']
})
export class UserCompetencesComponent implements OnInit {
  
  userId: number;
  
  @ViewChild('competenceModal') competenceModal: ModalComponent;

  constructor(private route: ActivatedRoute, private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  competenceCreated(event: any) {
    this.competenceModal.toggle(null);
    this.dialogService.showTimedAlert(this.translateService.instant('message.success.skillAdded'), 1000);
  }

}
