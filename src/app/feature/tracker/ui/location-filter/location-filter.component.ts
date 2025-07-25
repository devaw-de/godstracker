import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { ToggleButtonComponent } from '../../../../shared/components';

interface Page {
  value: number;
  selected: boolean;
}

@Component({
  selector: 'app-location-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location-filter.component.html',
  styleUrl: './location-filter.component.scss',
  imports: [
    ToggleButtonComponent
  ]
})
export class LocationFilterComponent {

  pages = input.required<number[]>();
  selection = signal<number[]>([]);
  pageSelection = computed<Page[]>(() => this.pages()
    .map((value) => ({
      value: value,
      selected: !this.selection() || this.selection().includes(value),
    }))
  );

  selectionChange$ = output<number[]>();

  #update = effect(() => {
    this.selectionChange$.emit(this.selection());
  });

  protected toggleSelection(value: number): void {
    this.selection.update((state) => {
      return state.includes(value)
      ? state.filter((v) => v !== value)
      : state.concat(value).sort();
    });
  }

  protected toggleAll() {
    this.selection().length === this.pages().length
     ? this.selection.set([])
      : this.selection.set(this.pages());
  }
}
