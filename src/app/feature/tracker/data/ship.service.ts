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
  readonly #initialDamage = {
    [ShipRoom.NONE]: 0,
    [ShipRoom.DECK]: 0,
    [ShipRoom.BRIDGE]: 0,
    [ShipRoom.SICK_BAY]: 0,
    [ShipRoom.QUARTERS]: 0,
    [ShipRoom.GALLEY]: 0
  };

  readonly #ship = signal<Ship>({
    location: this.#gameStartingPosition,
    room: ShipRoom.NONE,
    damage: this.#initialDamage,
  });
  readonly lastShipRoom = computed<ShipRoom>(() => this.#ship().room);
  readonly lastLocation = computed<number>(() => this.#ship().location);
  readonly shipDamage = computed<Record<ShipRoom, number>>(() => this.#ship().damage);
  readonly hasChanges = computed<boolean>(() =>
    this.lastLocation() !== this.#gameStartingPosition
    || this.lastShipRoom() !== ShipRoom.NONE
    || this.shipDamage().DECK > 0
    || this.shipDamage().BRIDGE > 0
    || this.shipDamage().GALLEY > 0
    || this.shipDamage().SICK_BAY > 0
    || this.shipDamage().QUARTERS > 0
    || this.shipDamage().NONE > 0
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

  updateShipDamage(room: ShipRoom, value: number): void {
    this.#update({
      ...this.#ship(),
      damage: {
        ...this.#ship().damage,
        [ShipRoom[room]]: value
      }
    });
  }

  updateLastShipRoom(shipRoom: ShipRoom): void {
    this.#update({
      ...this.#ship(),
      room: shipRoom
    });
  }

  updateLastLocation(location: number): void {
    this.#update({
      ...this.#ship(),
      location: location
    });
  }

  reset(): void {
    this.#update({
      location: this.#gameStartingPosition,
      room: ShipRoom.NONE,
      damage: this.#initialDamage
    });
  }

  #update(ship: Ship): void {
    this.#storageService.set(StorageKey.SHIP, ship);
    this.#ship.set(ship);
  }
}
