import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrl: './explanation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplanationComponent {
  readonly codeUrl = input.required<string>();
  readonly gameUrl = input.required<string>();
}
