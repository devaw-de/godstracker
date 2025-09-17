import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-location-comments',
  templateUrl: './location-comments.component.html',
  styleUrls: ['./location-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationCommentsComponent {
  readonly comments = input.required<string[]>();

  readonly addComment = output<void>();
  readonly deleteComment = output<number>();
  readonly editComment = output<number>();
}
