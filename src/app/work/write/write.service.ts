import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'
import { Write } from './write';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class WriteService {

    private url = 'write/';  // URL to web api

    constructor(private http: HttpClient) { }

    getAll(): Observable<Write[]> {
        console.debug(this.url);
        return this.http.get(environment.baseUrl + this.url)
            .map(response => {
                console.debug(response);
                return response as Write[];
            });
    }

    getOne(id: String): Observable<Write> {
        return this.http.get(this.url + id)
            .map(response => response as Write);
    }

    update(write: Write) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(this.url , JSON.stringify(event), {})
            .map(res => res);
    }

    create(write: Write) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url , JSON.stringify(event), {})
            .map(res => res);
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

}
