import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-crew-fatigue-indicator',
  templateUrl: './crew-fatigue-indicator.component.html',
  imports: [
    FaIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewFatigueIndicatorComponent {
  protected readonly icons = {
    fatigue: faBolt
  };

  readonly fatigue = input.required<number>();
  readonly fatigueIcons = computed(() => Array.from({length: this.fatigue()}));
}
