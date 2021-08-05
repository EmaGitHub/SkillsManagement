import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'src/app/core/services/utils/dialog-service';
import { SpinnerService } from 'src/app/core/services/utils/spinner-service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Competence } from '../../models/Competence';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-competences',
  templateUrl: './user-competences.component.html',
  styleUrls: ['./user-competences.component.scss']
})
export class UserCompetencesComponent implements OnInit {
  
  userId: number;

  @Input() userSkills: Competence[];
  
  @ViewChild('competenceModal') competenceModal: ModalComponent;

  dataSource: MatTableDataSource<Competence> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'evaluation', 'validUserId', 'validDate'];

  constructor(private route: ActivatedRoute, private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userSkills) {
      this.dataSource = changes.userSkills.currentValue;
    }
  }
 
  competenceCreated(event: any) {
    this.competenceModal.toggle(null);
    this.dialogService.showTimedAlert(this.translateService.instant('message.success.skillAdded'), 1000);



  }

}
