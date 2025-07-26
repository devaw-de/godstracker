import { Injectable, signal } from '@angular/core';
import Dexie from 'dexie';
import { AppLocation } from '../model';
import { LOCATIONS } from './locations';

@Injectable({
  providedIn: 'root'
})
export class LocationsDbService extends Dexie {

  readonly #tableName = 'locations';

  #locations = signal<AppLocation[]>([]);
  locations = this.#locations.asReadonly();

  constructor() {
    super('Dexie');
    this.version(1).stores({
      locations: 'id, page, requires, comments, done'
    });
    this.#populateIfEmpty();
  }

  async #populateIfEmpty(): Promise<void> {
    const count = await this.table(this.#tableName).count();
    if (!count) {
      await this.bulkAdd(LOCATIONS);
    }
    this.#locations.set(
      await this.table(this.#tableName).toArray()
    );
  }

  async clearAll(): Promise<void> {
    this.table(this.#tableName).clear();
  }

  async bulkAdd(items: AppLocation[]): Promise<boolean> {
    try {
      await this.table(this.#tableName)
        .bulkAdd(items);
      this.#locations.set(
        await this.table(this.#tableName).toArray()
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async update(location: AppLocation): Promise<boolean> {
    try {
      await this.table(this.#tableName)
        .delete(location.id);
      await this.table(this.#tableName)
        .add(location);
      this.#locations.set(
        await this.table(this.#tableName).toArray()
      );
      return true;
    } catch {
      return false;
    }
  }

  async unsetDoneStatus(): Promise<boolean> {
    try {
      await this.table(this.#tableName)
        .where('done')
        .anyOf([1, 'true', '1'])
        .each((entry) => {
          this.update({ ...entry, done: false });
        })
      return true;
    } catch {
      return false;
    }
  }
}
