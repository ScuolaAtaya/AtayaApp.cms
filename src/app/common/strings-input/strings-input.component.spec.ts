import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringsInputComponent } from './strings-input.component';

describe('StringsInputComponent', () => {
  let component: StringsInputComponent;
  let fixture: ComponentFixture<StringsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
