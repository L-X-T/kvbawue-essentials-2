import { Component, inject, signal } from '@angular/core';
import { delay } from 'rxjs';
import { AirportService } from './airport.service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  imports: [AsyncPipe],
})
export class AirportsComponent {
  readonly airports = signal<string[]>([]);
  private readonly airports$ = inject(AirportService).findAll().pipe(delay(3_000));

  constructor() {
    this.airports$.pipe(takeUntilDestroyed()).subscribe((airports) => this.airports.set(airports));
  }
}
