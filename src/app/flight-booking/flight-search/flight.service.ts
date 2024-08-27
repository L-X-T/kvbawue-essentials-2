import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Flight } from '../../entities/flight';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private readonly headers = new HttpHeaders().set('Accept', 'application/json');
  private readonly url = 'http://www.angular.at/api/flight';
  // private readonly url = 'https://demo.angulararchitects.io/api/Flight';

  private readonly http = inject(HttpClient);
  // constructor(private http: HttpClient) {}

  find(from: string, to: string): Observable<Flight[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<Flight[]>(this.url, { headers: this.headers, params });
  }

  save(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.url, flight, { headers: this.headers });
  }
}
