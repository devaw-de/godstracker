import { computed, inject, Injectable } from '@angular/core';
import { AppLocation } from '../model';
import { LocationsDbService } from './locations.db.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  readonly #dbService = inject(LocationsDbService);

  locations = computed(() => (this.#dbService.locations()).sort(this.#locationSortFn));

  update(location: AppLocation) {
    this.#dbService.update(location);
  }

  #locationSortFn(a: AppLocation, b: AppLocation): number {
    return a.page === b.page
    ? a.id - b.id
    : a.page - b.page;
  }
}
