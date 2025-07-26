import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AppLocation, AppQuest } from '../../model';
import { BadgeComponent } from '../../../../shared/components';

@Component({
  selector: 'app-quest-details-modal',
  templateUrl: './quest-details-modal.component.html',
  styleUrl: './quest-details-modal.component.scss',
  imports: [
    BadgeComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestDetailsModalComponent implements OnInit {

  #data = inject(DIALOG_DATA);
  #dialogRef = inject(DialogRef);

  locations = signal<AppLocation[]>([]);
  quest = signal<AppQuest | undefined>(undefined);
  matchingLocations = computed<AppLocation[]>(() => this.locations()
    .filter((location) => location.requires.includes(this.quest()!.id))
  );

  ngOnInit(): void {
    this.locations.set(this.#data.locations);
    this.quest.set(this.#data.quest);
  }

  protected close(): void {
    this.#dialogRef.close();
  }

  protected delete(): void {
    this.#dialogRef.close({delete: true});
  }

}
