import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {

  mainText = input<string>('');
  subText = input<string>('');
  caption = input<string>('');
  done = input<boolean | undefined>(false);
}
