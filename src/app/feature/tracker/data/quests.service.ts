import { inject, Injectable, signal } from '@angular/core';
import { AppQuest, StorageKey } from '../model';
import { QUESTS_CARDS } from './quest-cards';
import { StorageService } from '../../../shared/services/storage.service';
import { SgStorage } from '../../../shared/model/sg-storage';

@Injectable({
  providedIn: 'root',
})
export class QuestsService implements SgStorage {

  readonly #storageService = inject(StorageService);

  readonly #quests = signal<AppQuest[]>([]);
  readonly quests = this.#quests.asReadonly();

  readonly questCards = [...QUESTS_CARDS.entries()].map(card => ({
    id: card[0],
    name: card[1]
  }));

  constructor() {
    this.initFromStorage();
  }

  initFromStorage(): void {
    const storedQuests = this.#storageService.get<AppQuest[]>(StorageKey.QUESTS);
    if (storedQuests) {
      this.#quests.set(storedQuests);
    }
  }

  add(quest: AppQuest): void {
    const updatedQuests = [
      ...this.quests(),
      quest
    ];
    this.#quests.set(updatedQuests);
    this.#storageService.set<AppQuest[]>(StorageKey.QUESTS, updatedQuests);
  }

  remove(questId: number): void {
    const updatedQuests = this.quests().filter(quest => questId !== quest.id);
    this.#quests.set(updatedQuests);
    this.#storageService.set(StorageKey.QUESTS, updatedQuests);
  }

  reset(startingQuests: AppQuest[] = []): void {
    this.#quests.set(startingQuests);
    this.#storageService.set<AppQuest[]>(StorageKey.QUESTS, startingQuests);
  }
}
