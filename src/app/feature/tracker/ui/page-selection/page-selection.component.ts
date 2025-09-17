import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-page-selection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-selection.component.html',
  styleUrl: './page-selection.component.scss'
})
export class PageSelectionComponent {

  readonly pages = input.required<number[]>();
  readonly selectedPage = input.required<number>();

  readonly selectionChange = output<number>();

}
