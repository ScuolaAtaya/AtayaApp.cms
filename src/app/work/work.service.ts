import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment'
import { Work } from './work';

export abstract class WorkService {

    private baseUrl = environment.baseUrl;

    protected http: HttpClient;

    protected getAll<T extends Work>(target: string): Observable<T[]> {
        return this.http.get(this.createUrl(this.baseUrl, target))
            .map(response => response as T[]);
    }

    getOne<T extends Work>(target: string, id: string): Observable<T> {
        return this.http.get(this.createUrl(this.baseUrl, target, id))
            .map(response => response as T);
    }

    protected getAllBySection<T extends Work>(target: string, section: number): Observable<T[]> {
        return this.http.get(this.createUrl(this.baseUrl, target, 'unit_id', String(section)))
            .map(response => response as T[]);
    }

    update<T extends Work>(target, work: T) {
        return this.http.put(this.createUrl(this.baseUrl, target), JSON.stringify(event), {})
            .map(res => res);
    }

    create<T extends Work>(target: string, work: T) {
        return this.http.post(this.createUrl(this.baseUrl, target), JSON.stringify(event), {})
            .map(res => res);
    }

    protected handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }


    protected createUrl(...elements: string[]): string {
        return elements.join('/');
    }

}
