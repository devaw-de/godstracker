import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { take } from 'rxjs';
import { AppLocation } from '../../model/';
import { BadgeComponent, TextInputModalComponent } from '../../../../shared/components';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
  imports: [
    BadgeComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {

  #dialog = inject(Dialog);

  location = input.required<AppLocation>();

  locationChange$ = output<AppLocation>();

  protected deleteComment(locationId: number, index: number): void {
    const decision = confirm(`Are you sure you want to delete this comment for location ${locationId}?`);
    if (!decision) {
      return;
    }
    this.locationChange$.emit({
      ...this.location(),
      comments: this.location().comments!.splice(index, 1)
    })
  }

  protected editComment(locationId: number, index: number): void {
    const comment = this.location()?.comments?.at(index);
    if (!comment) {
      return;
    }

    const dialog = this.#dialog.open<string>(TextInputModalComponent, {
      data: {
        locationId: locationId,
        heading: 'Edit Comment',
        value: comment,
        label: 'Comment'
      }
    });
    dialog.closed
      .pipe(take(1))
      .subscribe((dialogValue) => {
        if (!dialogValue) {
          return;
        }
        this.locationChange$.emit({
          ...this.location(),
          comments: this.location()?.comments?.splice(index, 1, dialogValue)
        });
      });
  }

  protected addComment(locationId: number): void {
    const dialog = this.#dialog.open<string>(TextInputModalComponent, {
      data: {
        locationId: locationId,
        heading: `Add Comment`,
        label: 'Comment',
      }
    })
    dialog.closed
      .pipe(take(1))
      .subscribe((dialogValue) => {
        if (!dialogValue) {
          return;
        }
        this.locationChange$.emit({
          ...this.location(),
          comments: [
            ...(this.location()?.comments ?? []),
            dialogValue
          ]
        });
      });
  }

  protected addRequirement(locationId: number): void {
    const dialog = this.#dialog.open<number>(TextInputModalComponent, {
      data: {
        locationId: locationId,
        heading: `Add Requirement`,
        label: 'Requirement',
      }
    })
    dialog.closed.pipe(take(1)).subscribe((dialogValue) => {
      if (!dialogValue) {
        return;
      }
      this.locationChange$.emit({
        ...this.location(),
        requires: [
          ...(this.location().requires ?? []),
          dialogValue
        ]
      });
    });
  }

  protected deletedRequirement(locationId: number, index: number): void {
    const decision = confirm(`Are you sure you want to delete this requirement for location ${locationId}?`);
    if (!decision) {
      return;
    }
    this.locationChange$.emit({
      ...this.location(),
      requires: [
        ...this.location().requires.filter((i) => i !== index),
      ]
    });
  }

}
