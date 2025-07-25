import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LocationsDbService } from '../tracker/data/locations.db.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  readonly #dbService = inject(LocationsDbService);

  showMenu = signal<boolean>(false);

  protected open(): void {
    this.showMenu.set(true);
  }

  protected close(): void {
    this.showMenu.set(false);
  }

  protected async clearStorage(): Promise<void> {
    confirm('Are you sure you want to clear storage?');
    await this.#dbService.clearAll();
    window.location.reload();
  }
}
