import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AppLocation, AppQuest } from '../../model';
import { BadgeComponent } from '../../../../shared/components';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-quest-details-modal',
  templateUrl: './quest-details-modal.component.html',
  styleUrl: './quest-details-modal.component.scss',
  imports: [BadgeComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestDetailsModalComponent implements OnInit {

  readonly #data = inject(DIALOG_DATA);
  readonly #dialogRef = inject(DialogRef);

  readonly locations = signal<AppLocation[]>([]);
  readonly quest = signal<AppQuest | undefined>(undefined);
  readonly matchingLocations = computed<AppLocation[]>(() => this.locations()
    .filter((location) => location.requires.includes(this.quest()!.id))
  );
  readonly rewardLocations = computed<AppLocation[]>(() => this.locations()
    .filter((location) => location.rewards.includes(this.quest()!.id))
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

  protected openLocation(locationId: number): void {
    this.#dialogRef.close({ showLocation: locationId });
  }
}
