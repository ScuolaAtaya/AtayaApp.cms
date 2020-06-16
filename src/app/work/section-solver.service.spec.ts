import { TestBed, inject } from '@angular/core/testing';
import { SectionSolverService } from './section-solver.service';

describe('SectionSolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectionSolverService]
    });
  });

  it('should be created', inject([SectionSolverService], (service: SectionSolverService) => {
    expect(service).toBeTruthy();
  }));
});
