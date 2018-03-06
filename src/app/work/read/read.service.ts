import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'
import { Read } from './read';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReadService {

    private url = 'read/';  // URL to web api

    constructor(private http: HttpClient) { }

    getAll(): Observable<Read[]> {
        return this.http.get(environment.baseUrl + this.url)
            .map(response => {
                return response as Read[];
            });
    }

    getOne(id: String): Observable<Read> {
        return this.http.get(this.url + id)
            .map(response => response as Read);
    }

    update(read: Read) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(this.url , JSON.stringify(event), {})
            .map(res => res);
    }

    create(read: Read) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url , JSON.stringify(event), {})
            .map(res => res);
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

}
