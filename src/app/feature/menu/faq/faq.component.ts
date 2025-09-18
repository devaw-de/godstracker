import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent {
  readonly faq = input.required<{title: string; answer: string}[]>();
}
