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

  showMenu = signal<boolean>(false);

  protected open(): void {
    this.showMenu.set(true);
  }

  protected close(): void {
    this.showMenu.set(false);
  }

  protected async clearStorage(): Promise<void> {
    const decision = confirm('Are you sure you want to clear storage?');
    if (!decision) {
      return;
    }
    await Promise.all([
      this.#locationsDbService.clearAll(),
      this.#questsDbService.clearAll()
    ]);
    window.location.reload();
  }
}
