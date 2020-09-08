import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Work } from '../work';
import { WorkService } from '../work.service';
import { RequestService } from '../../common/request.service';

@Injectable()
export class TalkService extends WorkService {
    constructor(protected requestService: RequestService) {
        super(requestService);
        this.target = 'speak';
    }

    getList<T extends Work>(sectionId: number): Observable<T[]> {
        return this.getAllBySection(sectionId);
    }
}
