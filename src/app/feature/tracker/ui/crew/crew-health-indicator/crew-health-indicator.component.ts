import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-crew-health-indicator',
  templateUrl: './crew-health-indicator.component.html',
  imports: [
    FaIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewHealthIndicatorComponent {
  protected readonly icons = {
    heart: faHeart,
  };

  readonly health = input.required<number>();
  readonly maxHealth = input.required<number>();
}
