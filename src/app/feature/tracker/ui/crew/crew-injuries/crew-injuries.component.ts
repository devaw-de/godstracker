import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHeart, faHeartCircleMinus, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-crew-injuries',
  templateUrl: './crew-injuries.component.html',
  styleUrl: './crew-injuries.component.scss',
  imports: [
    FaIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewInjuriesComponent {
  protected readonly icons = {
    filledHeart: faHeart,
    emptyHeart: faHeartRegular,
    heartPlus: faHeartCirclePlus,
    heartMinus: faHeartCircleMinus,
  };

  readonly injuries = input.required<number>();
  readonly maxHealth = input.required<number>();
  readonly injuriesHearts = computed<boolean[]>(() => Array
    .from({ length: this.maxHealth() })
    .map((_, index) => index >= this.injuries())
  );

  readonly incrementInjuries = output<1 | -1>();

  protected decreaseInjuries(): void {
    if (this.injuries() <= 0) {
      return;
    }
    this.incrementInjuries.emit(-1);
  }

  protected increaseInjuries(): void {
    if (this.injuries() >= this.maxHealth()) {
      return;
    }
    this.incrementInjuries.emit(1);
  }
}
