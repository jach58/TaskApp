import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskfilterComponent } from './taskfilter.component';

describe('TaskfilterComponent', () => {
  let component: TaskfilterComponent;
  let fixture: ComponentFixture<TaskfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskfilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
