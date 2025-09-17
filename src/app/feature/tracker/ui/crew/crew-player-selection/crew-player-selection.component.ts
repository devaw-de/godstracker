import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-crew-player-selection',
  templateUrl: './crew-player-selection.component.html',
  styleUrls: ['./crew-player-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewPlayerSelectionComponent {
  readonly players = input.required<string[]>();
  readonly selectedPlayer = input.required<number>();

  readonly playerChange = output<string>();
}
