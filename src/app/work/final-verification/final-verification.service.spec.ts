import { TestBed, inject } from '@angular/core/testing';

import { FinalVerificationService } from './final-verification.service';

describe('FinalVerificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinalVerificationService]
    });
  });

  it('should be created', inject([FinalVerificationService], (service: FinalVerificationService) => {
    expect(service).toBeTruthy();
  }));
});
