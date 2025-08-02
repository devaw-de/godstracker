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
import { LocationsService, PAGES, QuestsService } from './data/';

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

  readonly pages: number[] = Array.from({ length: PAGES.length }).map((_, index) => index + 2);
  readonly questCards: AppQuest[] = this.#questsService.questCards;

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
    const dialog = this.#dialog.open<number>(QuestFinderModalComponent, {
      data: {
        cards: this.#questsService.questCards,
        heading: 'Add A Quest Card'
      }
    });
    dialog.closed
      .pipe(take(1))
      .subscribe((result) => {
        const card = this.questCards.find((q) => q.id === result)
        if (card) {
          this.#questsService.add(card);
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
}
