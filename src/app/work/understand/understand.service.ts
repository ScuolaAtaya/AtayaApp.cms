import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { WorkService } from '../work.service';
import { Work } from '../work';
import {RequestService} from "../../common/request.service";

@Injectable()
export class UnderstandService extends WorkService {

    constructor(protected requestService: RequestService) {
        super(requestService)
        this.target = 'understand'
    }

    public getList<T extends Work>(sectionId: number): Observable<T[]> {
        return this.getAllBySection(sectionId);
    }

}
