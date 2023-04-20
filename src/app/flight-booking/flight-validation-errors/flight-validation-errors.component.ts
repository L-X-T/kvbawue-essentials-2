import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [JsonPipe],
  selector: 'app-flight-validation-errors',
  templateUrl: './flight-validation-errors.component.html',
  styleUrls: ['./flight-validation-errors.component.css'],
})
export class FlightValidationErrorsComponent {
  @Input({ required: true }) errors: ValidationErrors | null = null;
  @Input() fieldLabel = 'Field';
}
