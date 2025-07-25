import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { LocationComponent, LocationFilterComponent, QuestComponent } from './ui/';
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
    console.log('update Location', location);
    this.#locationsService.update(location);
  }

  log = effect(() => console.dir(this.filteredLocations().map(x => x.comments)))

}
