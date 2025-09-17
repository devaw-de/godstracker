import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AppQuestWithAvailability } from '../../../model';

@Component({
  selector: 'app-location-section',
  templateUrl: './location-section.component.html',
  styleUrl: './location-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationSectionComponent {

  readonly quests = input.required<AppQuestWithAvailability[]>();
  readonly heading = input.required<string>();

  readonly addQuest = output<void>();
  readonly deleteQuest = output<number>();

  protected add(): void {
    this.addQuest.emit();
  }

  protected delete(id: number): void {
    this.deleteQuest.emit(id);
  }

}
