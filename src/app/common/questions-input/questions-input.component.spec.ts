import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsInputComponent } from './questions-input.component';

describe('QuestionsInputComponent', () => {
  let component: QuestionsInputComponent;
  let fixture: ComponentFixture<QuestionsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
