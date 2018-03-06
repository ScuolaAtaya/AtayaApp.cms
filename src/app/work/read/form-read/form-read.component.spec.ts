import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReadComponent } from './form-read.component';

describe('FormReadComponent', () => {
  let component: FormReadComponent;
  let fixture: ComponentFixture<FormReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
