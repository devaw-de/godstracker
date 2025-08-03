import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

interface Page {
  value: number;
  selected: boolean;
}

@Component({
  selector: 'app-page-selection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-selection.component.html',
  styleUrl: './page-selection.component.scss'
})
export class PageSelectionComponent {

  pages = input.required<number[]>();
  selectedPage = input.required<number>();

  selectionChange$ = output<number>();

}
