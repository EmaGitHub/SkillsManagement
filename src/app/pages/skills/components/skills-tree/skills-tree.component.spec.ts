import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsTreeComponent } from './skills-tree.component';

describe('SkillsTreeComponent', () => {
  let component: SkillsTreeComponent;
  let fixture: ComponentFixture<SkillsTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
