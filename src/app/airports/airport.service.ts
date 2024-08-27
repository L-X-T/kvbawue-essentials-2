import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AirportNameFormat } from '../entities/airport-name-format';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  private readonly url = 'http://www.angular.at/api/airport';

  private readonly httpClient = inject(HttpClient);

  findAll(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url);
  }

  getAirportName(name: string, format: AirportNameFormat): Observable<string> {
    let url = 'http://angular-at.azurewebsites.net/api/airport/';
    url += format === 'short' ? 'code' : 'fullName';

    const params = new HttpParams().set('name', name);

    return this.httpClient.get<string>(url, { params });
  }
}
