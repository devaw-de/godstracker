import { Injectable, signal } from '@angular/core';
import { AppQuest } from '../model';

@Injectable({
  providedIn: 'root',
})
export class QuestsService {

  quests = signal<AppQuest[]>([]);

}
