import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUnderstandComponent } from './form-understand.component';

describe('FormUnderstandComponent', () => {
  let component: FormUnderstandComponent;
  let fixture: ComponentFixture<FormUnderstandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUnderstandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUnderstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
