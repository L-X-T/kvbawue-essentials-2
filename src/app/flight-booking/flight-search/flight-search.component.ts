import { Component, computed, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Flight } from '../../entities/flight';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from './flight.service';
import { CityPipe } from '../../shared/pipes/city.pipe';
import { BehaviorSubject, Observable, Observer, Subject, Subscription } from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { FlightStatusToggleComponent } from '../flight-status-toggle/flight-status-toggle.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, CityPipe, FlightCardComponent, FlightStatusToggleComponent],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit, OnDestroy {
  from = 'Hamburg';
  to = 'Graz';
  flights: Flight[] = []; // old school
  flights$?: Observable<Flight[]>; // observable
  flightsSubject = new BehaviorSubject<Flight[]>([]); // subject
  flightsSignal = signal<Flight[]>([]); // signal
  flightsLength = computed(() => this.flightsSignal().length); // signal

  flightsSubscription?: Subscription;
  private readonly onDestroySubject = new Subject<void>();
  readonly terminator$ = this.onDestroySubject.asObservable();

  selectedFlight?: Flight;

  message = '';

  basket: { [id: number]: boolean } = {
    3: true,
    5: true,
  };

  private readonly destroyRef = inject(DestroyRef);
  private readonly flightService = inject(FlightService);

  constructor() {
    effect(() => console.log(this.flightsSignal(), this.flightsLength()));
  }

  ngOnInit(): void {
    if (this.from && this.to) {
      this.onSearch();
    }
  }

  ngOnDestroy(): void {
    // 4a. my unsubscribe
    this.flightsSubscription?.unsubscribe();

    // 4b. subject emit thru terminator$
    this.onDestroySubject.next();
    this.onDestroySubject.complete();

    // complete behavior subject
    this.flightsSubject.complete();
  }

  onSearch(): void {
    // 1. my observable
    this.flights$ = this.flightService.find(this.from, this.to).pipe(share());

    // 2. my observer
    const flightsObserver: Observer<Flight[]> = {
      next: (flights) => {
        this.flights = flights;
        this.flightsSubject.next(flights);
        this.flightsSignal.set(flights);
        this.flightsSignal.update((flights) => [...flights]);
      },
      error: (errResp: HttpErrorResponse) => console.error('Error loading flights', errResp),
      complete: () => console.debug('Flights loading completed.'),
    };

    // 3a. my subscription
    this.flightsSubscription?.unsubscribe();
    this.flightsSubscription = this.flights$.subscribe(flightsObserver);

    // 3b. takeUntil terminator$ emits
    this.flights$.pipe(takeUntil(this.terminator$)).subscribe(flightsObserver);

    // 3c. takeUntilDestroyed
    this.flights$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(flightsObserver);
  }

  onSelect(selectedFlight: Flight): void {
    this.selectedFlight = selectedFlight;
  }

  onSave(): void {
    if (this.selectedFlight) {
      this.flightService
        .save(this.selectedFlight)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
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
}
