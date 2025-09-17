import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent {
  readonly isChecked = input.required<boolean>();
  readonly checkedLabel = input.required<string>();
  readonly uncheckedLabel = input<string>('');

  readonly id = signal<string>('switch' + crypto.randomUUID());
}
