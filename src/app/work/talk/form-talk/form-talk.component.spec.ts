import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTalkComponent } from './form-talk.component';

describe('FormTalkComponent', () => {
  let component: FormTalkComponent;
  let fixture: ComponentFixture<FormTalkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTalkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
