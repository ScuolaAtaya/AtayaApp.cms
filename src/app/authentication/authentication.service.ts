import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment'

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers: headers });

export class User {
  name: string;
  token: string;

  constructor() { }
}

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(environment.baseUrl + '/login', JSON.stringify({ username: username, password: password }), options).map(
      (response: Response) => {
        const token = response.json() && response.json().authToken;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ name: username, token: token }));
          return true;
        } else {
          return false;
        }
      }
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
