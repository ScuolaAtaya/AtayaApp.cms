import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'
import { Talk } from './talk';
import { Work } from '../work';
import { WorkService } from '../work.service';

@Injectable()
export class TalkService extends WorkService {

    constructor(http: HttpClient) {
        super();
        this.http = http;
        this.target = 'speak';
    }

    public getList<T extends Work>(sectionId: number): Observable<T[]> {
        return this.getAllBySection(sectionId);
    }

}
