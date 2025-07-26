import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { take } from 'rxjs';
import {
  LocationComponent,
  LocationFilterComponent,
  QuestComponent,
  QuestDetailsModalComponent,
  QuestFinderModalComponent
} from './ui/';
import { AppLocation, AppQuest } from './model/';
import { LocationsService, PAGES, QUESTS_CARDS, QuestsService } from './data/';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss',
  imports: [
    QuestComponent,
    LocationComponent,
    LocationFilterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackerComponent {

  readonly #locationsService = inject(LocationsService);
  readonly #questsService = inject(QuestsService);
  readonly #dialog = inject(Dialog);

  readonly pages = Array.from({length: PAGES.length}).map((_, index) => index + 2);

  #pageSelection = signal<number[]>([]);
  filteredLocations = computed<AppLocation[]>(() => this.#locationsService.locations()
    .filter((location) => this.#pageSelection().includes(location.page))
  );
  quests = this.#questsService.quests;

  protected updateSelection(ev: number[]): void {
    this.#pageSelection.set(ev);
  }

  protected updateLocation(location: AppLocation): void {
    this.#locationsService.update(location);
  }

  protected addQuest(): void {
    const cards = [...QUESTS_CARDS.entries()].map(card => ({
      id: card[0],
      name: card[1]
    }));
    console.warn(cards);
      const dialog = this.#dialog.open<AppQuest>(QuestFinderModalComponent, {
        data: {
          cards: cards,
          heading: 'Add A Quest Card'
        }
      });
    dialog.closed
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.#questsService.add(result);
        }
      })
  }

  protected showQuestDetails(id: number): void {
    const dialog = this.#dialog.open<{ delete?: boolean }>(QuestDetailsModalComponent, {
      data: {
        quest: this.quests().find((q) => q.id === id),
        locations: this.#locationsService.locations()
      }
    });
    dialog.closed
      .pipe(take(1))
      .subscribe((result) => {
        if (result?.delete) {
          this.#deleteQuest(id);
        }
      })
  }

  #deleteQuest(id: number): void {
    const decision = confirm(`Are you sure you want to delete Quest ${id}?`);
    if (decision) {
      this.#questsService.delete(id);
    }
  }

  protected readonly QUESTS_CARDS = QUESTS_CARDS;
}
