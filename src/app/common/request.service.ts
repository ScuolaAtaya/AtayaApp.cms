import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LogService} from "./log.service";

@Injectable()
export class RequestService {
  constructor(private http: HttpClient, private logger: LogService) {}

  public get(url, headers = {}) {
    return this.request('GET', url, headers)
  }

  public put(url, data, headers = {}) {
    return this.request('PUT', url, data, headers)
  }

  public post(url, data, headers = {}) {
    return this.request('POST', url, data, headers)
  }

  public delete(url, headers = {}) {
    return this.request('DELETE', url, headers)
  }

  private request(method, url, data, headers = {}) {
    let req = undefined

    switch (method) {
      case 'GET': {
        req = this.http.get(url, headers)
        break;
      }
      case 'PUT': {
        req = this.http.put(url, data, headers)
        break;
      }
      case 'POST': {
        req = this.http.post(url, data, headers)
        break;
      }
      case 'DELETE': {
        req = this.http.delete(url, headers)
        break;
      }
      default: {
        break;
      }
    }
    return req.map(res => res).catch((e: any) => Observable.throw(this.handleErrorObservable(e)))
  }

  protected handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    this.logger.serverError()
    return Observable.throw(error.message || error);
  }
}