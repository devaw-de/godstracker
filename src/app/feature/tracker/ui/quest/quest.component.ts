import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppQuest } from '../../model';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrl: './quest.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestComponent {

  quest = input.required<AppQuest>();

}
