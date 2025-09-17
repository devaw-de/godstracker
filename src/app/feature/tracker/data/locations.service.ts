import { computed, inject, Injectable, signal } from '@angular/core';
import { AppLocation, StorageKey } from '../model';
import { StorageService } from '../../../shared/services/storage.service';
import { LOCATIONS } from './locations';
import { SgStorage } from '../../../shared/model/sg-storage';

@Injectable({
  providedIn: 'root'
})
export class LocationsService implements SgStorage {

  readonly #storageService = inject(StorageService);

  readonly #locations = signal<AppLocation[]>(LOCATIONS);
  readonly locations = computed(() => this.#locations().sort((a, b) =>
     a.id - b.id
  ));

  constructor() {
    this.initFromStorage();
  }

  initFromStorage(): void {
    const storedLocations = this.#storageService.get<AppLocation[]>(StorageKey.LOCATIONS);
    if (storedLocations) {
      this.#locations.set(storedLocations);
    }
  }

  update(location: AppLocation) {
    const locations = [
      ...this.locations().filter((loc) => loc.id !== location.id),
      location
    ];
    this.#storageService.set<AppLocation[]>(StorageKey.LOCATIONS, locations);
    this.#locations.set(locations);
  }

  bulkMarkUndone(): void {
    const locations = this.locations().map((location) => ({
      ...location,
      done: false
    }))
    this.#storageService.set<AppLocation[]>(StorageKey.LOCATIONS, locations);
    this.#locations.set(locations);
  }
}
