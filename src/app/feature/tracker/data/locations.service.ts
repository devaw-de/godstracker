import { inject, Injectable } from '@angular/core';
import { AppLocation } from '../model';
import { LocationsDbService } from './locations.db.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  readonly #dbService = inject(LocationsDbService);

  locations = this.#dbService.locations;

  update(location: AppLocation) {
    this.#dbService.update(location);
  }
}
