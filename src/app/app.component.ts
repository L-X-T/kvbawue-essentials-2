import { Component, inject, signal } from '@angular/core';

import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FlightSearchComponent } from './flight-booking/flight-search/flight-search.component';
import { AirportsComponent } from './airports/airports.component';
import { AirportService } from './airports/airport.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, FlightSearchComponent, AirportsComponent, AsyncPipe],
  selector: 'app-flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Hello World!';

  readonly airports = signal<string[]>([]);
  private readonly airports$ = inject(AirportService).findAll();
  selectedAirport = '';

  constructor() {
    this.airports$.pipe(takeUntilDestroyed()).subscribe((airports) => this.airports.set(airports));
  }
}
