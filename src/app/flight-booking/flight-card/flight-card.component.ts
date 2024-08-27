import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Flight } from '../../entities/flight';
import { FlightStatusToggleComponent } from '../flight-status-toggle/flight-status-toggle.component';

@Component({
  standalone: true,
  imports: [DatePipe, FlightStatusToggleComponent],
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  debug = true;

  @Input({ required: true }) item!: Flight;
  @Input() selected = false;

  constructor() {
    this.debugInputs('constructor');
  }

  ngOnChanges(): void {
    this.debugInputs('ngOnChanges');
  }

  ngOnInit(): void {
    this.debugInputs('ngOnInit');
  }

  ngOnDestroy(): void {
    this.debugInputs('ngOnDestroy');
  }

  private debugInputs(method: string): void {
    if (this.debug) {
      console.warn('[FlightCardComponent - ' + method + '()]');
      console.debug('flight', this.item);
      console.debug('selected', this.selected);
    }
  }
}
