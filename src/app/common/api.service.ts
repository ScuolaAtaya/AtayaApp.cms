import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { RequestService } from './request.service';

@Injectable()
export class ApiService {
  private baseUrl = environment.baseUrl;

  constructor(protected requestService: RequestService) { }

  createBook() {
    return this.requestService.get(this.createUrlFromBaseUrl('book/create/v2'));
  }

  private createUrl(...elements: string[]): string {
    return elements.join('/');
  }

  public createUrlFromBaseUrl(...elements: string[]): string {
    elements.unshift(this.baseUrl);
    return elements.join('/');
  }
}
