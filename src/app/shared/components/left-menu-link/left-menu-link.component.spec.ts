import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMenuLinkComponent } from './left-menu-link.component';

describe('LeftMenuLinkComponent', () => {
  let component: LeftMenuLinkComponent;
  let fixture: ComponentFixture<LeftMenuLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftMenuLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMenuLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
