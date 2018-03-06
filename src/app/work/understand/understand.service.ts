import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'
import { Understand } from './understand';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UnderstandService {

    private url = 'understand/';  // URL to web api

    constructor(private http: HttpClient) { }

    getAll(): Observable<Understand[]> {
        console.debug(this.url);
        return this.http.get(environment.baseUrl + this.url)
            .map(response => {
                console.debug(response);
                return response as Understand[];
            });
    }

    getOne(id: String): Observable<Understand> {
        return this.http.get(this.url + id)
            .map(response => response as Understand);
    }

    update(understand: Understand) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(this.url , JSON.stringify(event), {})
            .map(res => res);
    }

    create(understand: Understand) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url , JSON.stringify(event), {})
            .map(res => res);
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

}
