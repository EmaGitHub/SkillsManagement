import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { DialogService } from 'src/app/core/services/utils/DialogService';
import { SpinnerService } from 'src/app/core/services/utils/SpinnerService';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { SkillArea } from '../../models/skill-area.model';
import { SkillItem } from '../../models/skill-item';
import { Skill } from '../../models/skill.model';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skills-tree',
  templateUrl: './skills-tree.component.html',
  styleUrls: ['./skills-tree.component.scss']
})
export class SkillsTreeComponent implements OnInit {

  skills: Skill[];
  skillAreas: SkillArea[];

  skillItems: SkillItem[] = [];

  parentAreaId: number;

  @ViewChild('areaModal') areaModal: ModalComponent;
  @ViewChild('skillModal') skillModal: ModalComponent;

  constructor(private skillsService: SkillsService, private spinnerService: SpinnerService, private dialogService: DialogService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinnerService.start();
    this.skillItems = [];
    forkJoin([this.skillsService.getSkills(), this.skillsService.getSkillAreas()])
      .subscribe(([skills, areas]: [Skill[], SkillArea[]]) => {
          this.skillAreas = areas;
          this.skills = skills;
          console.log("Response: Skills -> "+JSON.stringify(this.skills)+" Areas -> "+JSON.stringify(this.skillAreas));
          this.buildHierarchy();
          this.spinnerService.stop();
      },
      (error: any) => {
        this.spinnerService.stop();
        console.log("Error response: "+error);
        if (error.status != 401)
          this.dialogService.showTimedAlert(this.translateService.instant('message.error.genericError'), 1500);
      }
    );
  }

  buildHierarchy(): void {
    for (let area of this.skillAreas) {
      // root item
      if (area.parentId == -1) {
        this.skillItems.push({id: area.id, label: area.name, isArea: true, children: []})
      }
      // nested item (has parent)
      else {
        let item: SkillItem = this.getItem(this.skillItems, area.parentId); //this.skillItems.filter( item => item.id === area.parentId)
        if (item)
          item.children.push({id: area.id, label: area.name, isArea: true, children: []})
      }
    }
    // skill at leaf
    for (let skill of this.skills) {
      let item: SkillItem = this.getItem(this.skillItems, skill.areaId);
      if (item)
        item.children.unshift({id: skill.id, label: skill.competence, isArea: false});           //push or unshift
    }
  }

  showAreaModal(parentAreaId: number) {
    this.parentAreaId = parentAreaId;
    this.areaModal.toggle(null);
  }

  showSkillModal(parentAreaId: number) {
    this.parentAreaId = parentAreaId;
    this.skillModal.toggle(null);
  }

  areaCreated(area: SkillArea) {
    this.areaModal.toggle(null);
    // if area creation succeeded
    if (area.name) {
      // if root item
      if (area.parentId == -1) {
        this.skillItems.push({id: area.id, label: area.name, isArea: true, children: []})
      }
      else {    // if nested item
        const result: {items: SkillItem[], index: number} = this.getItemAreaChildren(this.skillItems, area.parentId);  
        let parent: SkillItem = result.items.filter(item => item.id == area.parentId)[0];
        parent.children.push({id: area.id, label: area.name, isArea: true, children: []})
      }
    }
  }

  skillCreated(skill: Skill) {
    this.skillModal.toggle(null);
    // if skill creation succeeded
    if (skill.competence) {
      const result: {items: SkillItem[], index: number} = this.getItemAreaChildren(this.skillItems, skill.areaId);  
      let parent: SkillItem = result.items.filter(item => item.id == skill.areaId)[0];
      parent.children.unshift({id: skill.id, label: skill.competence, isArea: false})    }
  }

  deleteArea(areaId: number) {
    this.dialogService.showConfirmAlert(this.translateService.instant('message.warn.deleteSkillArea'), this.translateService.instant('message.warn.confirmDeleteSkillArea'), 
                                                this.translateService.instant('message.success.yes'), "No", () => {
      this.spinnerService.start();
      this.skillsService.deleteSkillArea(areaId).subscribe(
        (resp: any) => {
          console.log("Skill area deleted "+JSON.stringify(resp));
          // remove area from view
          const result: {items: SkillItem[], index: number} = this.getItemAreaChildren(this.skillItems, areaId);  
          result.items.splice(result.index, 1)
          this.spinnerService.stop();
        },
        (error: any) => {
          console.log("Err "+JSON.stringify(error));
          this.spinnerService.stop();
        }
      );
    });
  }

  deleteSkill(skillId: number) {
    this.dialogService.showConfirmAlert(this.translateService.instant('message.warn.deleteSkill'), this.translateService.instant('message.warn.confirmDeleteSkill'), 
                                                this.translateService.instant('message.success.yes'), "No", () => {                                         
      this.spinnerService.start();
      this.skillsService.deleteSkill(skillId).subscribe(
        (resp: any) => {
          console.log("Skill deleted");
          // remove from view
          const result: {items: SkillItem[], index: number} = this.getItemAreaChildren(this.skillItems, skillId);  
          result.items.splice(result.index, 1)
          this.spinnerService.stop();
        },
        (error: any) => {
          console.log("Err "+JSON.stringify(error));
          this.spinnerService.stop();
        }
      );
    });
  }

  getItem = function (subMenuItems: SkillItem[], id) {
    if (subMenuItems) {
        for (var i = 0; i < subMenuItems.length; i++) {
            if (subMenuItems[i].id == id) {
                return subMenuItems[i];
            }
            var found = this.getItem(subMenuItems[i].children, id);
            if (found) return found;
        }
    }
  };

  getItemAreaChildren(subMenuItems: SkillItem[], id): {items: SkillItem[], index: number} {
    if (subMenuItems) {
        for (var i = 0; i < subMenuItems.length; i++) {
            if (subMenuItems[i].id == id) {
              return {items: subMenuItems, index: i};
            }
            var found = this.getItemAreaChildren(subMenuItems[i].children, id);
            if (found) return found;
        }
    }
  };

  ngOnDestroy() {}

}
