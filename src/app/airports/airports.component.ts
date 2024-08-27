import { Component, input, output } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  imports: [AsyncPipe],
})
export class AirportsComponent {
  airports = input.required<string[]>();
  airportSelected = output<string>();
}
