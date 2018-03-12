import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersInputComponent } from './answers-input.component';

describe('AnswersInputComponent', () => {
  let component: AnswersInputComponent;
  let fixture: ComponentFixture<AnswersInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswersInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
