import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AppLocationTag } from '../../../model';
import { LocationTagPipe } from '../location-tags/human-readable-tag.pipe';
import { LocationTagIconPipe } from '../location-tags/icon-tag.pipe';

@Component({
  selector: 'app-location-tag-selection-modal',
  templateUrl: './location-tag-selection-modal.component.html',
  styleUrl: './location-tag-selection-modal.component.scss',
  imports: [
    LocationTagIconPipe,
    LocationTagPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationTagSelectionModalComponent implements OnInit {

  readonly data = inject(DIALOG_DATA);
  readonly #dialogRef = inject(DialogRef);

  readonly #currentTags = signal<AppLocationTag[]>([]);
  readonly #allTags = signal<AppLocationTag[]>([]);
  readonly unusedTags = computed<AppLocationTag[]>(() => (this.#allTags() ?? [])
    .filter((tag) => !this.#currentTags().includes(tag))
  );

  ngOnInit(): void {
    this.#currentTags.set(this.data.currentTags);
    this.#allTags.set(this.data.allTags);
  }

  protected add(tag: AppLocationTag | undefined): void {
    this.#dialogRef.close(tag);
  }
}
