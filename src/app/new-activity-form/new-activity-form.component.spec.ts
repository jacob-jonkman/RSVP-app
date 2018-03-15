import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActivityFormComponent } from './new-activity-form.component';

describe('NewActivityFormComponent', () => {
  let component: NewActivityFormComponent;
  let fixture: ComponentFixture<NewActivityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewActivityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
