import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LocationsDbService } from '../tracker/data/locations.db.service';
import { QuestsDbService } from '../tracker/data/quests.db.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  readonly #locationsDbService = inject(LocationsDbService);
  readonly #questsDbService = inject(QuestsDbService);
  readonly gameUrl = 'https://www.redravengames.com/sleeping-gods/';
  readonly codeUrl = '#';

  showMenu = signal<boolean>(false);

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
    alert('NYI')
  }
}
