import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { take } from 'rxjs';
import { AppLocation } from '../../model/';
import { TextInputModalComponent } from '../../../../shared/components';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {

  #dialog = inject(Dialog);

  location = input.required<AppLocation>();

  locationChange$ = output<AppLocation>();

  protected deleteComment(index: number): void {
    const decision = confirm('Are you sure you want to delete this note?');
    if (!decision) {
      return;
    }
    this.locationChange$.emit({
      ...this.location(),
      comments: this.location().comments!.splice(index, 1)
    })
  }

  protected editComment(index: number): void {
    const comment = this.location()?.comments?.at(index);
    if (!comment) {
      return;
    }

    const dialog = this.#dialog.open<string>(TextInputModalComponent, {
      data: {
        heading: 'Edit Comment',
        value: comment,
        label: 'Comment'
      }
    });
    dialog.closed
      .pipe(take(1))
      .subscribe((dialogValue) => {
        alert(dialogValue);
        if (!dialogValue) {
          return;
        }
        this.locationChange$.emit({
          ...this.location(),
          comments: this.location()?.comments?.splice(index, 1, dialogValue)
        });
      });
  }

  protected addComment(): void {
    console.log('Add Comment');
    const dialog = this.#dialog.open<string>(TextInputModalComponent, {
      data: {
        heading: 'Add Comment',
        label: 'Comment'
      }
    })
    dialog.closed
      .pipe(take(1))
      .subscribe((dialogValue) => {
        console.log('dialog closed', dialogValue);
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

  protected addRequirement() {
    const dialog = this.#dialog.open<number>(TextInputModalComponent, {
      data: {
        heading: 'Add Requirement',
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

  protected deletedRequirement(index: number): void {
    const decision = confirm('Are you sure you want to delete this requirement?')
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
