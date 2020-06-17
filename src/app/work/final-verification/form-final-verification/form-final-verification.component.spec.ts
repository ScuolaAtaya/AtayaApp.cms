import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFinalVerificationComponent } from './form-final-verification.component';

describe('FormFinalVerificationComponent', () => {
  let component: FormFinalVerificationComponent;
  let fixture: ComponentFixture<FormFinalVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFinalVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFinalVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
