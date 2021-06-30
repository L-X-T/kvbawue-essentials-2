import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Flight } from '../../entities/flight';

@Component({
  standalone: true,
  imports: [DatePipe],
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  debug = true;

  @Input({ required: true }) item!: Flight;
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

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

  onSelect(): void {
    this.selected = true;
    this.debugInputs('onSelect');
    this.selectedChange.emit(true);
  }

  onDeselect(): void {
    this.selected = false;
    this.debugInputs('onDeselect');
    this.selectedChange.emit(false);
  }

  private debugInputs(method: string): void {
    if (this.debug) {
      console.debug('[FlightCardComponent - ' + method + '()]');
      console.debug('flight', this.item);
      console.debug('selected', this.selected);
    }
  }
}
