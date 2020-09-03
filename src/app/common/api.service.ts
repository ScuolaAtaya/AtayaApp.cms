import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { RequestService } from './request.service';

@Injectable()
export class ApiService {
  private baseUrl = environment.baseUrl;

  constructor(protected requestService: RequestService) { }

  createBook(): Observable<any> {
    return this.requestService.get(this.createUrlFromBaseUrl('book/create/v2'));
  }

  createUrlFromBaseUrl(...elements: string[]): string {
    elements.unshift(this.baseUrl);
    return elements.join('/');
  }
}
