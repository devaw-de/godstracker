import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TextModalComponent } from '../../shared/components';
import { CrewService, ItemsService, LocationsService, QuestsService, StorageService } from '../tracker/data';
import { AppItems, AppLocation, AppQuest, Crew, ShipRoom, StorageKey } from '../tracker/model';
import {
  FileSelectionModalComponent
} from '../../shared/components/file-selection-modal/file-selection-modal.component';
import { take } from 'rxjs';
import { FAQ } from './faq/faq';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FaqComponent } from './faq/faq.component';
import { ExplanationComponent } from './explanation/explanation.component';
import { ShipService } from '../tracker/data/ship.service';
import { NewGameModalComponent } from './new-game/new-game-modal.component';

interface Dto {
  items: AppItems;
  locations: AppLocation[];
  quests: AppQuest[];
  ships: {
    room: ShipRoom;
    location: number;
  };
  crew: Crew;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    FaqComponent,
    ExplanationComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  readonly #locationsService = inject(LocationsService);
  readonly #questsService = inject(QuestsService);
  readonly #storageService = inject(StorageService);
  readonly #itemsService = inject(ItemsService);
  readonly #shipService = inject(ShipService);
  readonly #crewService = inject(CrewService);
  readonly #dialog = inject(Dialog);

  protected readonly faq = FAQ;

  readonly showMenu = signal<boolean>(false);
  readonly exportDisabled = computed<boolean>(() =>
    !this.#locationsService.hasChanges()
    && !this.#questsService.quests().length
    && !this.#itemsService.hasItems()
    && !this.#shipService.hasChanges()
    && !this.#crewService.hasChanges()
  );

  protected open(): void {
    this.showMenu.set(true);
  }

  protected close(): void {
    this.showMenu.set(false);
  }

  protected newGame(): void {
    const dialog = this.#dialog.open<{ quests: AppQuest[], items: AppItems }>(NewGameModalComponent);
    dialog.closed
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          console.warn(result);
          this.#itemsService.update(result.items);
          this.#crewService.reset();
          this.#shipService.reset();
          this.#questsService.reset(result.quests);
        }
        this.showMenu.set(false);
      });
  }

  protected clearStorage(): void {
    const texts = [
      'Are you sure you want to clear storage?',
      'This will delete any input you made.',
      'The app will be reset to its initial state.'
    ]
    const decision = confirm(texts.join(' '));
    if (!decision) {
      return;
    }

    for (const value of Object.values(StorageKey)) {
      this.#storageService.remove(value);
    }
    this.#reloadApp();
  }

  protected unmarkLocations(): void {
    const texts = [
      'Are you sure?',
      'All Locations will be marked as not done.'
    ];
    const decision = confirm(texts.join(' '));
    if (decision) {
      this.#locationsService.bulkMarkUndone();
    }
  }

  protected clearQuests(): void {
    const texts = [
      'Are you sure?',
      'You will lose all quest cards!'
    ];
    const decision = confirm(texts.join(' '));
    if (decision) {
      this.#storageService.remove(StorageKey.QUESTS);
    }
  }

  protected export(): void {
    try {
      const json = JSON.stringify({
        locations: this.#storageService.get(StorageKey.LOCATIONS),
        quests: this.#storageService.get(StorageKey.QUESTS),
        ships: this.#storageService.get(StorageKey.SHIP),
        items: this.#storageService.get(StorageKey.ITEMS),
        crew: this.#storageService.get(StorageKey.CREW),
      });
      this.#downloadJsonStringAsFile(json);

      this.#dialog.open<void>(TextModalComponent, {
        data: {
          heading: 'Saved',
          icon: faCheckCircle,
          texts: [
            'Your status was saved as godsTracker.json to your download folder.',
            'You can import this file to resume the game.'
          ]
        }
      });
    } catch {
      this.#showError();
    }
  }

  protected import(): void {
    const dialog = this.#dialog.open<void>(FileSelectionModalComponent, {});
    dialog.closed.pipe(take(1)).subscribe((file) => {
      if (!file) {
        return;
      }

      try {
        this.#readFileContents(file);
        this.showMenu.set(false);
      } catch {
        this.#showError();
      }
    });
  }

  #readFileContents(file: File): void {
    const reader = new FileReader();
    reader.onload = this.#fileReaderOnloadHandler.bind(this);
    reader.readAsText(file);
  }

  #fileReaderOnloadHandler(ev: ProgressEvent<FileReader>): void {
    const json = this.#parseFileContents(ev.target?.result as string);

    if (this.#isValid(json)) {
      this.#store(json);
      this.#reloadApp();
    } else {
      this.#showError('Please select a file you previously exported from this app.');
    }
  }

  #parseFileContents(file: string): Dto {
    return JSON.parse(file);
  }

  #downloadJsonStringAsFile(json: string): void {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    link.download = 'godsTracker.json';
    link.click();
    link.remove();
  }

  #isValid(json: Dto): boolean {
    return json?.locations?.length > 0;
  }

  #showError(message?: string): void {
    this.#dialog.open<void>(TextModalComponent, {
      data: {
        heading: 'Error',
        icon: faExclamationTriangle,
        texts: [
          'Something did not work out right. Please try again.',
          message,
        ].filter(Boolean),
      }
    });
  }

  #store(json: Dto): void {
    if (json.locations) {
      this.#storageService.set(StorageKey.LOCATIONS, json.locations);
    }
    if (json.quests) {
      this.#storageService.set(StorageKey.QUESTS, json.quests);
    }
    if (json.items) {
      this.#storageService.set(StorageKey.ITEMS, json.items);
    }
    if (json.ships) {
      this.#storageService.set(StorageKey.SHIP, json.ships);
    }
    if (json.crew) {
      this.#storageService.set(StorageKey.CREW, json.crew);
    }
  }

  #reloadApp(): void {
    window.location.reload();
  }
}
