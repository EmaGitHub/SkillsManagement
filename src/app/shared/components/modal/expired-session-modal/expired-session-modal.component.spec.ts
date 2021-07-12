import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredSessionModalComponent } from './expired-session-modal.component';

describe('ExpiredSessionModalComponent', () => {
  let component: ExpiredSessionModalComponent;
  let fixture: ComponentFixture<ExpiredSessionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredSessionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredSessionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
