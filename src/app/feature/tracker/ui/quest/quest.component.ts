import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppQuest } from '../../model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  imports: [
    JsonPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestComponent {

  quest = input.required<AppQuest>();

}
