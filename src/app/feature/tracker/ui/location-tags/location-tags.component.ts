import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { AppLocationTag } from '../../model';
import { LocationTagPipe } from './human-readable-tag.pipe';
import { Dialog } from '@angular/cdk/dialog';
import { take } from 'rxjs';
import { LocationTagSelectionModalComponent } from '../location-tag-selection/location-tag-selection-modal.component';

@Component({
  selector: 'app-location-tags',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './location-tags.component.html',
  imports: [
    LocationTagPipe
  ],
  styleUrl: './location-tags.component.scss'
})
export class LocationTagsComponent {

  readonly #dialog = inject(Dialog);

  currenTags = input.required<AppLocationTag[]>();
  allTags = input.required<AppLocationTag[]>();

  tagChange$ = output<AppLocationTag[]>();

  protected add(): void {
    const dialog = this.#dialog.open<AppLocationTag>(LocationTagSelectionModalComponent, {
      data: {
        currentTags: this.currenTags(),
        allTags: this.allTags(),
      }
    });
    dialog.closed
      .pipe(take(1))
      .subscribe((additionalTag) => {
        if (additionalTag) {
          this.tagChange$.emit([
            ...this.currenTags(),
            additionalTag
          ]);
        }
      });
  }

  protected remove(tag: AppLocationTag): void {
    this.tagChange$.emit([
      ...this.currenTags().filter((t) => t !== tag),
    ]);
  }

}
