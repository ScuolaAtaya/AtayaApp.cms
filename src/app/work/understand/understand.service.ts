import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'
import { Understand } from './understand';
import { WorkService } from '../work.service';
import { Work } from '../work';

@Injectable()
export class UnderstandService extends WorkService {

    private target = 'understand/';  // URL to web api

    constructor(http: HttpClient) {
        super();
        this.http = http;
    }

    public getList<T extends Work>(sectionId: number): Observable<T[]> {
        return this.getAllBySection(this.target, sectionId);
    }

}
