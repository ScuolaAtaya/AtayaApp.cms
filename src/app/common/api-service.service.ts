import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiServiceService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  createBook() {
    return this.http.get(this.createUrl(this.baseUrl, 'book/create'))
      .map(res => res);
  }

  protected createUrl(...elements: string[]): string {
    return elements.join('/');
  }
}
