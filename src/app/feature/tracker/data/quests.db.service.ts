import { Injectable, signal } from '@angular/core';
import Dexie from 'dexie';
import { AppQuest } from '../model';

@Injectable({
  providedIn: 'root'
})
export class QuestsDbService extends Dexie {

  readonly #tableName = 'quests';

  #quests = signal<AppQuest[]>([]);
  quests = this.#quests.asReadonly();

  constructor() {
    super('Dexie');
    this.version(1).stores({
      quests: 'id, name'
    });
    this.#getAll();
  }

  async #getAll(): Promise<void> {
    const quests = await this.table(this.#tableName).toArray();
    this.#quests.set(quests);
  }

  async add(item: AppQuest): Promise<void> {
    this.table(this.#tableName).add(item);
    await this.#getAll();
  }

  async remove(key: number): Promise<void> {
    await this.table(this.#tableName).delete(key);
    await this.#getAll();
  }

  async clearAll(): Promise<void> {
    await this.table(this.#tableName).clear();
    await this.#getAll();
  }

}
