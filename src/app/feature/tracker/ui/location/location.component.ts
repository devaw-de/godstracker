import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { take } from 'rxjs';
import { AppLocation, AppQuest } from '../../model/';
import { BadgeComponent, TextInputModalComponent } from '../../../../shared/components';
import { QuestFinderModalComponent } from '../quest-finder/quest-finder-modal.component';
import { QUESTS_CARDS } from '../../data';

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
  availableQuests = input.required<AppQuest[]>();
  requirements = computed(() => this.location().requires.map((id) => ({
    id: id,
    name: QUESTS_CARDS.get(id),
    available: this.availableQuests().find((q) => q.id === id),
  })));

  locationChange$ = output<AppLocation>();

  protected deleteComment(index: number): void {
    const decision = confirm(`Are you sure you want to delete this comment for location ${this.location().id}?`);
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
        badge: {
          mainText: this.location().id,
          subText: this.location().page,
          caption: this.location().title
        },
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

  protected addComment(): void {
    const dialog = this.#dialog.open<string>(TextInputModalComponent, {
      data: {
        badge: {
          mainText: this.location().id,
          subText: this.location().page,
          caption: this.location().title
        },
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

  protected addRequirement(): void {
    const cards = [...QUESTS_CARDS.entries()].map(card => ({
      id: card[0],
      name: card[1]
    }))
    const dialog = this.#dialog.open<AppQuest>(QuestFinderModalComponent, {
      data: {
        cards: cards,
        badge: {
          mainText: this.location().id,
          subText: 'p. ' + this.location().page
        },
        heading: `Add Requirement`,
        label: 'Requirement',
      }
    })
    dialog.closed
      .pipe(take(1))
      .subscribe((dialogValue) => {
      if (!dialogValue || this.location().requires.includes(dialogValue.id)) {
        return;
      }
      this.locationChange$.emit({
        ...this.location(),
        requires: [
          ...(this.location().requires ?? []),
          dialogValue.id
        ]
      });
    });
  }

  protected deletedRequirement(index: number): void {
    const decision = confirm(`Are you sure you want to delete this requirement for location ${this.location().id}?`);
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

  protected setDoneStatus(status: boolean): void {
    this.locationChange$.emit({
      ...this.location(),
      done: status
    });
  }

  protected readonly QUESTS_CARDS = QUESTS_CARDS;
}
