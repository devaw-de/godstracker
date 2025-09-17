import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-crew-items',
  templateUrl: './crew-items.component.html',
  styleUrls: ['./crew-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewItems {
  readonly title = input.required<string>();
  readonly items = input.required<string[]>();

  readonly add = output<void>();
  readonly remove = output<number>();
}
