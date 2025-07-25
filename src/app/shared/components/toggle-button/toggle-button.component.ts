import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent {
  value = input.required<string | number>();
  disabled = input<boolean>(false);
  selected = input<boolean>(false);
}
