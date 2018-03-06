import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment'
import { Talk } from './talk';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TalkService {

    private url = 'speak/';  // URL to web api

    constructor(private http: HttpClient) { }

    getAll(): Observable<Talk[]> {
        console.debug(this.url);
        return this.http.get(environment.baseUrl + this.url)
            .map(response => {
                console.debug(response);
                return response as Talk[];
            });
    }

    getOne(id: String): Observable<Talk> {
        return this.http.get(this.url + id)
            .map(response => response as Talk);
    }

    update(talk: Talk) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.put(this.url , JSON.stringify(event), {})
            .map(res => res);
    }

    create(talk: Talk) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.url , JSON.stringify(event), {})
            .map(res => res);
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

}
