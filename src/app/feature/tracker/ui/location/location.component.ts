import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { take } from 'rxjs';
import { AppLocation, AppLocationTag, AppQuest, AppQuestWithAvailability } from '../../model/';
import { BadgeComponent, TextInputModalComponent } from '../../../../shared/components';
import { QuestFinderModalComponent } from '../quest-finder';
import { QUESTS_CARDS } from '../../data';
import { LocationTagsComponent } from './location-tags/location-tags.component';
import { LocationSectionComponent } from './location-section/location-section.component';
import { LocationTagsPreviewComponent } from './location-tags-preview/location-tags-preview.component';
import { LocationCommentsComponent } from './location-commments/location-comments.component';
import { SwitchComponent } from '../../../../shared/components/switch/switch.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
  imports: [
    BadgeComponent,
    LocationTagsPreviewComponent,
    LocationSectionComponent,
    LocationTagsPreviewComponent,
    LocationTagsComponent,
    LocationCommentsComponent,
    SwitchComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent {

  readonly #dialog = inject(Dialog);
  readonly availableLocationTags = Object.values(AppLocationTag);

  readonly identifier = input.required<string>();
  readonly questCards = input.required<AppQuest[]>();
  readonly location = input.required<AppLocation>();
  readonly availableQuests = input.required<AppQuest[]>();
  readonly requirements = computed<AppQuestWithAvailability[]>(() => this.location().requires.map((id) => ({
    id: id,
    name: QUESTS_CARDS.get(id),
    available: !!this.availableQuests().find((q) => q.id === id),
  })));
  readonly rewards = computed<AppQuestWithAvailability[]>(() => (this.location().rewards ?? []).map((id) => ({
    id: id,
    name: QUESTS_CARDS.get(id),
    available: !!this.availableQuests().find((q) => q.id === id)
  })));

  readonly locationChange$ = output<AppLocation>();

  protected deleteComment(index: number): void {
    const decision = confirm(`Are you sure you want to delete this comment for location ${this.location().id}?`);
    if (!decision) {
      return;
    }
    const location = this.location();
    this.location().comments!.splice(index, 1);
    this.locationChange$.emit(location);
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
        const location = this.location();
        location.comments?.splice(index, 1, dialogValue);
        this.locationChange$.emit(location);
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
    const dialog = this.#dialog.open<number>(QuestFinderModalComponent, {
      data: {
        cards: this.questCards().filter((card) => !this.location().requires.includes(card.id)),
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
        if (!dialogValue || this.location().requires.includes(dialogValue)) {
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

  protected deletedRequirement(id: number): void {
    const decision = confirm(`Are you sure you want to delete this requirement for location ${this.location().id}?`);
    if (!decision) {
      return;
    }
    this.locationChange$.emit({
      ...this.location(),
      requires: [
        ...this.location().requires.filter((reqId) => reqId !== id),
      ]
    });
  }

  protected setDoneStatus(status: boolean): void {
    this.locationChange$.emit({
      ...this.location(),
      done: status
    });
  }

  protected addReward(): void {
    const dialog = this.#dialog.open<number>(QuestFinderModalComponent, {
      data: {
        cards: this.questCards().filter((card) => !this.location().rewards.includes(card.id)),
        badge: {
          mainText: this.location().id,
          subText: 'p. ' + this.location().page
        },
        heading: `Add Reward`,
        label: 'Reward',
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
          rewards: [
            ...(this.location().rewards ?? []),
            dialogValue
          ]
        })
      })
  }

  protected deletedReward(id: number): void {
    const decision = confirm(`Are you sure you want to delete this reward for location ${this.location().id}?`);
    if (!decision) {
      return;
    }
    this.locationChange$.emit({
      ...this.location(),
      rewards: this.location().rewards.filter((rewardId) => rewardId !== id),
    });
  }

  protected updateTags(tags: AppLocationTag[]): void {
    this.locationChange$.emit({
      ...this.location(),
      tags: tags
    });
  }
}
