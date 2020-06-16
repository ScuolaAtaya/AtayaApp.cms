import { Injectable } from '@angular/core';
import { WorkService } from '../work.service';
import { RequestService } from 'app/common/request.service';
import { Work } from '../work';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FinalVerificationService extends WorkService {

  constructor(protected requestService: RequestService) {
      super(requestService)
      this.target = 'final';
  }

  public getList<T extends Work>(sectionId: number): Observable<T[]> {
      return this.getAllBySection(sectionId);
  }
}
