import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-crew-command-tokens',
  templateUrl: './crew-command-tokens.component.html',
  styleUrls: ['./crew-command-tokens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewCommandTokensComponent {
  readonly commandTokens = input.required<number[]>();

  readonly increment = output<number>();
  readonly decrement = output<number>();
}
