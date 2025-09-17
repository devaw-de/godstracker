import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { take } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TextInputModalComponent } from '../../../../shared/components';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss',
  imports: [
    FaIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersComponent {
  readonly #dialog = inject(Dialog);

  protected readonly minPlayers = 1;
  protected readonly maxPlayers = 6;
  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;

  readonly players = input<string[]>([]);

  readonly playerChange = output<string[]>();

  protected addPlayer(): void {
    if (this.players().length >= this.maxPlayers) {
      return;
    }

    const dialog = this.#dialog.open<string>(TextInputModalComponent, {
      data: {
        heading: 'Enter player name',
        value: 'Player ' + (this.players().length + 1),
        label: 'Player name'
      }
    });
    dialog.closed
      .pipe(take(1))
      .subscribe((dialogValue) => {
        if (!dialogValue) {
          return;
        }
        this.playerChange.emit([
          ...this.players(),
          dialogValue
        ]);
      });
  }

  protected removePlayer(playerIndex: number): void {
    if (this.players().length <= this.minPlayers) {
      return;
    }

    this.playerChange.emit(
      this.players().filter((_, index) => index !== playerIndex),
    )
  }
}
