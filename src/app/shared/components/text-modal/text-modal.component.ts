import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrl: './text-modal.component.scss',
  imports: [
    FaIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextModalComponent {

  readonly #dialogRef = inject(DialogRef)
  readonly data = inject(DIALOG_DATA);

  close(): void {
    this.#dialogRef.close();
  }
}
