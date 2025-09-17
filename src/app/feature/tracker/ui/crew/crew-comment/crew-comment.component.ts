import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-crew-comment',
  templateUrl: './crew-comment.component.html',
  styleUrl: './crew-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewCommentComponent {
  readonly mateName = input.required<string>();
  readonly comment = input.required<string>();

  readonly updateComment = output<string>();
}
