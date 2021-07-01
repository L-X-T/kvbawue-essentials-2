import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-flight-status-toggle',
  templateUrl: './flight-status-toggle.component.html',
  styleUrls: ['./flight-status-toggle.component.css'],
})
export class FlightStatusToggleComponent {
  @Input() delayed = false;
  @Output() delayedChange = new EventEmitter<boolean>();
}
