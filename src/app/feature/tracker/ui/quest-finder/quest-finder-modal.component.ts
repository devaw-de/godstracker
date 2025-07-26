import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AppQuest } from '../../model';
import { SlicePipe } from '@angular/common';
import { BadgeComponent } from '../../../../shared/components';

@Component({
  selector: 'app-quest-finder-modal',
  templateUrl: './quest-finder-modal.component.html',
  styleUrl: './quest-finder-modal.component.scss',
  imports: [
    SlicePipe,
    BadgeComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestFinderModalComponent implements OnInit {

  readonly #dialogRef = inject(DialogRef);
  readonly #data = inject(DIALOG_DATA);

  readonly maxQuests = 8;

  #questCards = signal<AppQuest[]>([]);
  #searchTerm = signal<string>('');
  #badge = signal<{mainText: string; subText: string} | undefined>(undefined);
  #heading = signal<string>('');
  quests = computed<AppQuest[]>(() => this.#questCards()?.filter(
    (quest) => !this.#searchTerm() || quest.name?.match(new RegExp(this.#searchTerm()))?.length
  ));
  badge = this.#badge.asReadonly();
  heading = this.#heading.asReadonly();

  ngOnInit(): void {
    this.#questCards.set(this.#data.cards);
    this.#badge.set(this.#data.badge);
    this.#heading.set(this.#data.heading);
  }

  protected cancel(): void {
    this.#dialogRef.close();
  }

  protected accept(questId: number): void {
    this.#dialogRef.close(
      this.#questCards().find(card => card.id === questId)
    );
  }

  protected updateSearchTerm(term: string): void {
    this.#searchTerm.set(term);
  }
}
