import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { QuestComponent } from './quest/quest.component';
import { AppQuest } from '../../model';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrl: './quests.component.scss',
  imports: [
    QuestComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestsComponent {
  readonly quests = input.required<AppQuest[]>();
  readonly addQuest = output<void>();
  readonly showDetails = output<number>();
}
