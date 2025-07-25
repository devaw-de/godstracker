import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-text-input-modal',
  templateUrl: './text-input-modal.component.html',
  styleUrl: './text-input-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextInputModalComponent {

  readonly #dialogRef = inject(DialogRef);

  data = inject(DIALOG_DATA)

  protected save(text: string): void {
    this.#dialogRef.close(text);
  }
}
