import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LocationsDbService } from '../tracker/data/locations.db.service';
import { QuestsDbService } from '../tracker/data/quests.db.service';
import { Dialog } from '@angular/cdk/dialog';
import { TextModalComponent } from '../../shared/components/text-modal/text-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  readonly #locationsDbService = inject(LocationsDbService);
  readonly #questsDbService = inject(QuestsDbService);
  readonly #dialog = inject(Dialog);
  readonly gameUrl = 'https://www.redravengames.com/sleeping-gods/';
  readonly codeUrl = '#';

  showMenu = signal<boolean>(false);
  exportDisabled = computed<boolean>(() => !this.#locationsDbService.locations().some(
        (location) => location.requires.length || location.comments?.length || location.rewards.length
      )
      && !this.#questsDbService.quests().length
  );

  protected open(): void {
    this.showMenu.set(true);
  }

  protected close(): void {
    this.showMenu.set(false);
  }

  protected async clearStorage(): Promise<void> {
    const texts = [
      'Are you sure you want to clear storage?',
      'This will delete any input you made.',
      'The app will be reset to its initial state.'
    ]
    const decision = confirm(texts.join(' '));
    if (!decision) {
      return;
    }
    await Promise.all([
      this.#locationsDbService.clearAll(),
      this.#questsDbService.clearAll()
    ]);
    window.location.reload();
  }

  protected async unmarkLocations(): Promise<void> {
    const texts = [
      'Are you sure?',
      'All Locations will be marked as not done.'
    ];
    const decision = confirm(texts.join(' '));
    if (decision) {
      await this.#locationsDbService.unsetDoneStatus();
    }
  }

  protected async clearQuests(): Promise<void> {
    const texts = [
      'Are you sure?',
      ' You will lose all quest cards!'
    ];
    const decision = confirm(texts.join(' '));
    if (decision) {
      await this.#questsDbService.clearAll();
    }
  }

  protected export(): void {
    try {
      const json = JSON.stringify({
        locations: this.#locationsDbService.locations().filter(
          (location) => location.requires.length || location.rewards.length || location.comments?.length
        ),
        quests: this.#questsDbService.quests()
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
      link.download = 'godsTracker.json';
      link.click();
      link.remove();

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
}
