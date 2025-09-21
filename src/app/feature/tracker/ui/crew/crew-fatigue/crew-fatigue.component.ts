import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-crew-fatigue',
  templateUrl: './crew-fatigue.component.html',
  styleUrl: './crew-fatigue.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewFatigueComponent {
  readonly fatigue = input.required<number>();
  readonly maxFatigue = input.required<number>();
  readonly increment = output<void>();
  readonly decrement = output<void>();
}
