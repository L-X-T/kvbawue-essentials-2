import { inject, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

import { AirportService } from '../../airports/airport.service';
import { AirportNameFormat } from '../../entities/airport-name-format';

@Pipe({
  name: 'asyncCity',
  standalone: true,
})
export class AsyncCityPipe implements PipeTransform {
  private readonly airportService = inject(AirportService);

  transform(name: string, format: AirportNameFormat): Observable<string> {
    return this.airportService.getAirportName(name, format);
  }
}
