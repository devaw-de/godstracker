import { computed, inject, Injectable } from '@angular/core';
import { AppQuest } from '../model';
import { QuestsDbService } from './quests.db.service';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {

  readonly #dbService = inject(QuestsDbService);

  quests = computed<AppQuest[]>(() => this.#dbService.quests().sort((a, b) => a.name.localeCompare(b.name)));

  async add(quest: AppQuest): Promise<boolean> {
    return this.#dbService.add(quest)
      .then(() => true)
      .catch(() => false);
  }

  async delete(questId: number): Promise<boolean> {
    return this.#dbService.remove(questId)
      .then(() => true)
      .catch(() => false);
  }
}
