import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TextModalComponent } from '../../shared/components';
import { LocationsService, QuestsService, StorageService } from '../tracker/data';
import { StorageKey } from '../tracker/model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  readonly #locationsService = inject(LocationsService);
  readonly #questsService = inject(QuestsService);
  readonly #storageService = inject(StorageService);
  readonly #dialog = inject(Dialog);

  protected readonly gameUrl = 'https://www.redravengames.com/sleeping-gods/';
  protected readonly codeUrl = '#';
  protected readonly faq = [
    {
      title: "Why is this so ugly?",
      answer: "I'm not a designer"
    },
    {
      title: "...",
      answer: "..."
    }
  ];

  readonly showMenu = signal<boolean>(false);
  readonly exportDisabled = computed<boolean>(() => !this.#locationsService.locations().some(
        (location) => location.requires.length || location.comments?.length || location.rewards.length
      )
      && !this.#questsService.quests().length
  );

  protected open(): void {
    this.showMenu.set(true);
  }

  protected close(): void {
    this.showMenu.set(false);
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
    window.location.reload();
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
      });
      this.#downloadJsonStringAsFile(json);

      this.#dialog.open<void>(TextModalComponent, {
        data: {
          heading: 'Saved',
          texts: [
            'Your status was saved as godsTracker.json to your download folder.',
            'You can import this file to resume the game.'
          ]
        }
      });
    } catch {
      this.#dialog.open<void>(TextModalComponent, {
        data: {
          heading: 'Error',
          texts: ['Something did not work out right. Please try again.']
        }
      });
    }
  }

  #downloadJsonStringAsFile(json: string): void {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    link.download = 'godsTracker.json';
    link.click();
    link.remove();
  }
}
