import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { take } from 'rxjs';
import {
  CrewComponent,
  ItemsComponent,
  LocationComponent,
  PageSelectionComponent,
  PlayersComponent,
  QuestComponent,
  QuestDetailsModalComponent,
  QuestFinderModalComponent,
  ShipComponent
} from './ui/';
import { AppItems, AppLocation, AppQuest, Crew, ShipRoom } from './model/';
import { LocationsService, PAGES, QuestsService, ItemsService, PlayerService, CrewService } from './data/';
import { ShipService } from './data/ship.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss',
  imports: [
    CrewComponent,
    ItemsComponent,
    LocationComponent,
    PageSelectionComponent,
    PlayersComponent,
    QuestComponent,
    ShipComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackerComponent {

  readonly #crewService = inject(CrewService);
  readonly #dialog = inject(Dialog);
  readonly #itemsService = inject(ItemsService);
  readonly #locationsService = inject(LocationsService);
  readonly #playerService = inject(PlayerService);
  readonly #questsService = inject(QuestsService);
  readonly #shipService = inject(ShipService);

  readonly pages: number[] = Array.from({ length: PAGES.length }).map((_, index) => index + 2);
  readonly questCards: AppQuest[] = this.#questsService.questCards;

  readonly selectedPage = signal<number>(2);
  readonly filteredLocations = computed<AppLocation[]>(() => this.#locationsService.locations()
    .filter((location) => this.selectedPage() === location.page)
  );
  readonly crew = this.#crewService.crew;
  readonly quests = this.#questsService.quests;
  readonly players = this.#playerService.players;
  readonly items = this.#itemsService.items.asReadonly();
  readonly ship = {
    location: this.#shipService.lastLocation,
    room: this.#shipService.lastShipRoom,
    damage: this.#shipService.shipDamage
  };

  protected updateSelection(ev: number): void {
    this.selectedPage.set(ev);
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

  protected updatePlayers(players: string[]): void {
    this.#playerService.update(players);
  }

  protected updateCrew(crew: Crew[]): void {
    this.#crewService.updateCrew(crew);
  }

  protected updateItems(items: AppItems): void {
    this.#itemsService.update(items);
  }

  protected updateShipLocation(location: number): void {
    this.#shipService.updateLastLocation(location);
  }

  protected updateShipRoom(room: ShipRoom): void {
    this.#shipService.updateLastShipRoom(room);
  }

  protected updateShipDamage(event: { room: ShipRoom, value: number }): void {
    this.#shipService.updateShipDamage(event.room, event.value);
  }

  #deleteQuest(id: number): void {
    const decision = confirm(`Are you sure you want to delete Quest ${id}?`);
    if (decision) {
      this.#questsService.remove(id);
    }
  }
}
