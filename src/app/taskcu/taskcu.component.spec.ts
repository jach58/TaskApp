import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskcuComponent } from './taskcu.component';

describe('TaskcuComponent', () => {
  let component: TaskcuComponent;
  let fixture: ComponentFixture<TaskcuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskcuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
