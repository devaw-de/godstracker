import { inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { StorageKey } from '../model';
import { SgStorage } from '../../../shared/model/sg-storage';

@Injectable({
  providedIn: 'root'
})
export class PlayerService implements SgStorage {
  readonly #storageService = inject(StorageService);

  readonly #players = signal<string[]>(['Player One']);
  readonly players = this.#players.asReadonly();

  constructor() {
    this.initFromStorage();
  }

  initFromStorage(): void {
    const storedPlayers = this.#storageService.get<string[]>(StorageKey.PLAYERS);
    if (storedPlayers) {
      this.#players.set(storedPlayers);
    }
  }

  update(names: string[]): void {
    this.#players.set(names);
    this.#storageService.set(StorageKey.PLAYERS, names);
  }
}
