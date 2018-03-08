import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment'
import { Work } from './work';

export abstract class WorkService {

    private baseUrl = environment.baseUrl;

    protected http: HttpClient;
    protected target: string;

    protected getAll<T extends Work>(): Observable<T[]> {
        return this.http.get(this.createUrl(this.baseUrl, this.target), this.getHttpOptions())
            .map(response => response as T[]);
    }

    getOne<T extends Work>(id: string): Observable<T> {
        return this.http.get(this.createUrl(this.baseUrl, this.target, id), this.getHttpOptions())
            .map(response => response as T);
    }

    protected getAllBySection<T extends Work>(section: number): Observable<T[]> {
        return this.http.get(this.createUrl(this.baseUrl, this.target, 'unit_id', String(section)), this.getHttpOptions())
            .map(response => response as T[]);
    }

    update<T extends Work>(work: T, id: string) {
        return this.http.put(this.createUrl(this.baseUrl, this.target, id), JSON.stringify(work), this.getHttpOptions())
            .map(res => res);
    }

    create<T extends Work>(work: T) {
        return this.http.post(this.createUrl(this.baseUrl, this.target), JSON.stringify(work), this.getHttpOptions())
            .map(res => res);
    }

    delete(id: string) {
        return this.http.delete(this.createUrl(this.baseUrl, this.target, id), this.getHttpOptions())
            .map(res => res)
    }

    protected handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }


    protected createUrl(...elements: string[]): string {
        return elements.join('/');
    }

    protected getHttpOptions() {
        return {
            headers: new HttpHeaders(
                {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTlkMzg1NmZhYzdjZmM1YTQwNGNiYzkiLCJpYXQiOjE1MjAzNDk2OTV9.9c0UWfoXbaKmiqEP1UFH_h3fRviNwfTunBRaPd1n2ZY',
                    'Content-Type': 'application/json; charset=utf-8'
                }
            )
        };
    }
}

