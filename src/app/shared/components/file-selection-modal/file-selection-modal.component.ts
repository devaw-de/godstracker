import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-selection-modal',
  templateUrl: './file-selection-modal.component.html',
  styleUrl: './file-selection-modal.component.scss',
  imports: [
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSelectionModalComponent {
  readonly #dialogRef = inject(DialogRef);

  readonly filePicker = viewChild<ElementRef<HTMLInputElement>>('filePicker');

  protected readonly form = new FormGroup<{ file: FormControl<File | null>}>({
    file: new FormControl<File | null>(null, [Validators.required])
  });

  protected close(): void {
    this.#dialogRef.close();
  }

  protected import(): void {
    if (this.form.invalid) {
      return;
    }
    this.#dialogRef.close(this.filePicker()!.nativeElement.files?.[0]);
  }
}
