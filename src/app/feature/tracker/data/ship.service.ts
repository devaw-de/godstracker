import { computed, inject, Injectable, signal } from '@angular/core';
import { Ship, ShipRoom, StorageKey } from '../model';
import { StorageService } from '../../../shared/services/storage.service';
import { SgStorage } from '../../../shared/model/sg-storage';

@Injectable({
  providedIn: 'root'
})
export class ShipService implements SgStorage {
  readonly #storageService = inject(StorageService);
  readonly #gameStartingPosition = 2;

  readonly #ship = signal<Ship>({
    location: this.#gameStartingPosition,
    room: ShipRoom.NONE
  });
  readonly lastShipRoom = computed<ShipRoom>(() => this.#ship().room);
  readonly lastLocation = computed<number>(() => this.#ship().location);
  readonly hasChanges = computed<boolean>(() =>
    this.lastLocation() !== this.#gameStartingPosition
    || this.lastShipRoom() !== ShipRoom.NONE
  );

  constructor() {
    this.initFromStorage();
  }

  initFromStorage(): void {
    const storedShipInfo = this.#storageService.get<Ship>(StorageKey.SHIP);
    if (storedShipInfo) {
      this.#ship.set(storedShipInfo);
    }
  }

  updateLastShipRoom(shipRoom: ShipRoom): void {
    this.#update({
      room: shipRoom,
      location: this.#ship().location
    });
  }

  updateLastLocation(location: number): void {
    this.#update({
      room: this.#ship().room,
      location: location
    });
  }

  #update(ship: Ship): void {
    this.#storageService.set(StorageKey.SHIP, ship);
    this.#ship.set(ship);
  }
}
