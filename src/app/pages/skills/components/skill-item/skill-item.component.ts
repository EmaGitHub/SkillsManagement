import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SkillItem } from '../../models/skill-item';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.scss']
})
export class SkillItemComponent implements OnInit {
  
  dirExpanded: boolean = false;

  @Input() item: SkillItem;

  @Output() addArea: EventEmitter<any> = new EventEmitter<any>();
  @Output() addSkill: EventEmitter<any> = new EventEmitter<any>();
  @Output() removeSkill: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeArea: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  createArea(parentAreaId: number) {
    this.addArea.emit(parentAreaId);
  }

  createSkill(areaId: number) {
    this.addSkill.emit(areaId);
  }

  deleteArea(areaId: number) {
    this.removeArea.emit(areaId);
  }

  deleteSkill(skillId: number) {
    this.removeSkill.emit(skillId);
  }

}
