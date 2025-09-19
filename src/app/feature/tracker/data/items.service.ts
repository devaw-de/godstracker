import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { AppItems, StorageKey } from '../model';
import { SgStorage } from '../../../shared/model/sg-storage';

@Injectable({
  providedIn: 'root',
})
export class ItemsService implements SgStorage {

  readonly #storageService = inject(StorageService);

  readonly items = signal<AppItems>({
    xp: 0,
    coins: 0,
    artefacts: 0,
    grain: 0,
    vegetables: 0,
    meat: 0,
    materials: 0
  });
  readonly hasItems = computed(() =>
    this.items().xp
    || this.items().coins
    || this.items().artefacts
    || this.items().grain
    || this.items().vegetables
    || this.items().meat
    || this.items().materials
  );

  constructor() {
    this.initFromStorage();
  }

  initFromStorage(): void {
    const storedItems = this.#storageService.get<AppItems>(StorageKey.ITEMS);
    if (storedItems) {
      this.items.set(storedItems);
    }
  }

  update(items: AppItems): void {
    this.#storageService.set<AppItems>(StorageKey.ITEMS, items);
    this.items.set(items);
  }
}
