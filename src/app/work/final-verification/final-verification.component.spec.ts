import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalVerificationComponent } from './final-verification.component';

describe('FinalVerificationComponent', () => {
  let component: FinalVerificationComponent;
  let fixture: ComponentFixture<FinalVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
