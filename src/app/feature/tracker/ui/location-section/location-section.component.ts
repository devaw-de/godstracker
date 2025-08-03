import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AppQuestWithAvailability } from '../../model';

@Component({
  selector: 'app-location-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location-section.component.html',
  styleUrl: './location-section.component.scss',
})
export class LocationSectionComponent {

  quests = input.required<AppQuestWithAvailability[]>();
  heading = input.required<string>();

  add$ = output<void>();
  delete$ = output<number>();

  protected add(): void {
    this.add$.emit();
  }

  protected delete(id: number): void {
    this.delete$.emit(id);
  }

}
