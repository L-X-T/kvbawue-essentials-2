import { Component, model } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-flight-status-toggle',
  templateUrl: './flight-status-toggle.component.html',
  styleUrls: ['./flight-status-toggle.component.css'],
})
export class FlightStatusToggleComponent {
  delayed = model(false);

  onToggle(): void {
    this.delayed.update((delayed) => !delayed);
  }
}
