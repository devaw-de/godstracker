import { computed, inject, Injectable, signal } from '@angular/core';
import { Crew, crewHealth, CrewNames, StorageKey } from '../model';
import { StorageService } from '../../../shared/services/storage.service';
import { SgStorage } from '../../../shared/model/sg-storage';

@Injectable({
  providedIn: 'root'
})
export class CrewService implements SgStorage {
  readonly #storageService = inject(StorageService);

  readonly #initialCrew: Crew[] = [...Object.values(CrewNames)]
    .map((name) => ({
      name: name,
      playerIndex: name === CrewNames.CAPTAIN ? -1 : 0,
      commandTokens: name === CrewNames.CAPTAIN ? [0, 0, 0] : [0, 0],
      equipment: [],
      xpCards: [],
      abilityCards: [],
      injuries: 0,
      maxHealth: crewHealth[name],
      comment: ''
    }));

  #crew = signal<Crew[]>(this.#initialCrew);
  crew = computed<Crew[]>(() => this.#crew().sort((a, b) => a.name.localeCompare(b.name)));

  constructor() {
    this.initFromStorage();
  }

  initFromStorage(): void {
    const storedCrew = this.#storageService.get<Crew[]>(StorageKey.CREW);
    if (storedCrew) {
      this.#crew.set(storedCrew);
    }
  }

  updateCrew(crew: Crew[]): void {
    if (crew.length === Object.values(CrewNames).length) {
      this.#crew.set(crew);
      this.#storageService.set(StorageKey.CREW, crew);
      return;
    }
    throw new Error(`Invalid crew size ${crew.length}`);
  }
}
