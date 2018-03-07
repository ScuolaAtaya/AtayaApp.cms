import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers: headers });

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(environment.baseUrl + '/login', JSON.stringify({ username: username, password: password }), options)
      .map((response: Response) => {
        let token = response.json() && response.json().authToken;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}