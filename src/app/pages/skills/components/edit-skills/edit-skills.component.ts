import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../services/skills.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.scss']
})
export class EditSkillsComponent implements OnInit {

  skill: string = "";

  
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  selectedValue: string;

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {

  }


  addSkill() {

  }
  
}
