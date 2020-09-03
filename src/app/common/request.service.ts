import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LogService } from './log.service';

@Injectable()
export class RequestService {
  constructor(private http: HttpClient, private logger: LogService) { }

  get(url: string, headers = {}): Observable<any> {
    return this.request('GET', url, headers)
  }

  put(url: string, data: any, headers = {}): Observable<any> {
    return this.request('PUT', url, data, headers)
  }

  post(url: string, data: any, headers = {}): Observable<any> {
    return this.request('POST', url, data, headers)
  }

  delete(url: string, headers = {}): Observable<any> {
    return this.request('DELETE', url, headers)
  }

  private request(method: string, url: string, data: {}, headers = {}): Observable<any> {
    let req = undefined;
    switch (method) {
      case 'GET': {
        req = this.http.get(url, headers);
        break;
      }
      case 'PUT': {
        req = this.http.put(url, data, headers);
        break;
      }
      case 'POST': {
        req = this.http.post(url, data, headers);
        break;
      }
      case 'DELETE': {
        req = this.http.delete(url, headers);
        break;
      }
      default: break;
    }
    return req.map((res: any) => res).catch((e: any) => Observable.throw(this.handleErrorObservable(e)));
  }

  protected handleErrorObservable(error: Response | any): Observable<any> {
    console.error(error.message || error);
    this.logger.serverError();
    return Observable.throw(error.message || error);
  }
}
