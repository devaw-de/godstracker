import { Injectable } from '@angular/core';
import { StorageKey } from '../../feature/tracker/model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  set<T>(key: string, value: T): void {
    const item = localStorage.getItem('key');
    if (!item) {
      localStorage.removeItem('key');
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: StorageKey): T | undefined {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      try {
        return JSON.parse(storedItem);
      }
      catch {
        return undefined;
      }
    }
    return undefined;
  }

  remove(key: StorageKey): void {
    localStorage.removeItem(key);
  }
}
