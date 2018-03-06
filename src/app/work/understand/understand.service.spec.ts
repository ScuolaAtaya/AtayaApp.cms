import { TestBed, inject } from '@angular/core/testing';

import { UnderstandService } from './understand.service';

describe('UnderstandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnderstandService]
    });
  });

  it('should be created', inject([UnderstandService], (service: UnderstandService) => {
    expect(service).toBeTruthy();
  }));
});
