import { Component, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Flight } from '../entities/flight';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent {
  from = 'Hamburg';
  to = 'Graz';
  flights: Flight[] = [];
  selectedFlight?: Flight;

  message = '';

  private readonly http = inject(HttpClient);

  private readonly url = 'http://www.angular.at/api/flight';
  private readonly headers = new HttpHeaders().set('Accept', 'application/json');

  onSearch(): void {
    const params = new HttpParams().set('from', this.from).set('to', this.to);

    this.http.get<Flight[]>(this.url, { headers: this.headers, params }).subscribe({
      next: (flights: Flight[]) => {
        console.log('Flights loaded: ', flights);
        this.flights = flights;
      },
      error: (errResp: HttpErrorResponse) => {
        console.error('Error loading flights', errResp);
      },
      complete: () => {
        console.debug('Flights loading completed.');
      },
    });
  }

  onSelect(selectedFlight: Flight): void {
    this.selectedFlight = selectedFlight;
  }

  onSave(): void {
    this.http.post<Flight>(this.url, this.selectedFlight, { headers: this.headers }).subscribe({
      next: (flight) => {
        console.log('Flight saved: ', flight);
        this.selectedFlight = flight;
        this.message = 'Success!';
      },
      error: (errResponse: HttpErrorResponse) => {
        console.error('Error saving flight', errResponse);
        this.message = 'Error: ' + errResponse.message;
      },
    });
  }
}
